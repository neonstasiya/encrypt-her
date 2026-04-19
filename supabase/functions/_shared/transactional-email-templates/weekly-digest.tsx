import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'EncryptHer'

interface DigestItem {
  title: string
  url: string
  category?: string
  excerpt?: string
}

interface WeeklyDigestProps {
  items?: DigestItem[]
  weekRange?: string
}

const WeeklyDigestEmail = ({
  items = [],
  weekRange = 'this week',
}: WeeklyDigestProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{items.length} new {items.length === 1 ? 'item' : 'items'} on {SITE_NAME} {weekRange}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New on {SITE_NAME}</Heading>
        <Text style={subtitle}>Fresh content from {weekRange}</Text>

        {items.length === 0 ? (
          <Text style={text}>No new content this week — check back next Monday!</Text>
        ) : (
          items.map((item, i) => (
            <Section key={i} style={itemBox}>
              {item.category && <Text style={category}>{item.category.toUpperCase()}</Text>}
              <Heading as="h2" style={h2}>
                <Link href={item.url} style={titleLink}>{item.title}</Link>
              </Heading>
              {item.excerpt && <Text style={excerpt}>{item.excerpt}</Text>}
              <Link href={item.url} style={readLink}>Read on {SITE_NAME} →</Link>
            </Section>
          ))
        )}

        <Hr style={hr} />
        <Text style={footer}>
          You're getting this because you signed up to receive updates when grabbing
          a free safety guide from {SITE_NAME}. We send at most one email per week.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WeeklyDigestEmail,
  subject: (data: Record<string, any>) => {
    const count = Array.isArray(data.items) ? data.items.length : 0
    return count === 0
      ? `${SITE_NAME} weekly update`
      : `${count} new ${count === 1 ? 'thing' : 'things'} on ${SITE_NAME} this week`
  },
  displayName: 'Weekly content digest',
  previewData: {
    weekRange: 'Nov 4 – Nov 10',
    items: [
      {
        title: 'How to lock down your social accounts in 10 minutes',
        url: 'https://encrypther.org/blog/lock-down-socials',
        category: 'Online Privacy',
        excerpt: 'A no-nonsense walkthrough of the privacy settings that actually matter on Instagram, TikTok, and Facebook.',
      },
      {
        title: 'Travel Safety Checklist (PDF)',
        url: 'https://encrypther.org/guides/travel-safety',
        category: 'New Guide',
      },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '26px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 6px' }
const subtitle = { fontSize: '14px', color: '#6b7280', margin: '0 0 28px' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6' }
const itemBox = {
  borderLeft: '4px solid #a855f7',
  padding: '4px 0 4px 16px',
  margin: '0 0 24px',
}
const category = {
  fontSize: '11px',
  color: '#a855f7',
  fontWeight: 'bold',
  letterSpacing: '0.05em',
  margin: '0 0 4px',
}
const h2 = { fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px', lineHeight: '1.3' }
const titleLink = { color: '#1a1a1a', textDecoration: 'none' }
const excerpt = { fontSize: '14px', color: '#4a4a4a', lineHeight: '1.5', margin: '0 0 8px' }
const readLink = { fontSize: '14px', color: '#a855f7', textDecoration: 'none', fontWeight: 'bold' }
const hr = { border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0 20px' }
const footer = { fontSize: '12px', color: '#6b7280', lineHeight: '1.5', margin: 0 }
