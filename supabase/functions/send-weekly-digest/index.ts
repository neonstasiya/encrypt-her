import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://encrypther.org'

interface DigestItem {
  title: string
  url: string
  category?: string
  excerpt?: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // 1. Fetch blog posts published in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt, category, published_at')
      .eq('status', 'published')
      .gte('published_at', sevenDaysAgo)
      .order('published_at', { ascending: false })

    if (postsError) throw postsError

    const items: DigestItem[] = (posts ?? []).map((p) => ({
      title: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      category: p.category ?? 'Blog',
      excerpt: p.excerpt ?? undefined,
    }))

    // Skip sending entirely if there's nothing new
    if (items.length === 0) {
      console.log('No new content this week — skipping digest send')
      return new Response(JSON.stringify({ success: true, sent: 0, skipped: 'no_content' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 2. Get all active subscribers
    const { data: subs, error: subsError } = await supabase
      .from('safety_guide_emails')
      .select('email')
      .eq('active', true)

    if (subsError) throw subsError
    if (!subs || subs.length === 0) {
      return new Response(JSON.stringify({ success: true, sent: 0, skipped: 'no_subscribers' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Dedupe emails (same email may have signed up for multiple guides)
    const uniqueEmails = Array.from(new Set(subs.map((s) => s.email.toLowerCase())))

    // 3. Build week range label
    const end = new Date()
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const weekRange = `${fmt(start)} – ${fmt(end)}`
    const isoWeek = end.toISOString().slice(0, 10)

    // 4. Enqueue one transactional send per subscriber
    let sent = 0
    let failed = 0
    for (const email of uniqueEmails) {
      try {
        const { error: invokeError } = await supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'weekly-digest',
            recipientEmail: email,
            idempotencyKey: `digest-${isoWeek}-${email}`,
            templateData: { items, weekRange },
          },
        })
        if (invokeError) {
          failed++
          console.error('Failed to enqueue digest', { email, error: invokeError.message })
        } else {
          sent++
        }
      } catch (e) {
        failed++
        console.error('Exception enqueueing digest', { email, error: String(e) })
      }
    }

    console.log(`Weekly digest enqueued: sent=${sent} failed=${failed} items=${items.length}`)
    return new Response(
      JSON.stringify({ success: true, sent, failed, items: items.length, weekRange }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Weekly digest error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
