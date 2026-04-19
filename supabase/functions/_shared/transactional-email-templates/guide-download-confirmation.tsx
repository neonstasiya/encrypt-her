import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'EncryptHer'

interface GuideDownloadProps {
  guideTitle?: string
  downloadUrl?: string
  subscribed?: boolean
}

const GuideDownloadEmail = ({
  guideTitle = 'your safety guide',
  downloadUrl = 'https://encrypther.org',
  subscribed = false,
}: GuideDownloadProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your copy of {guideTitle} is ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your guide is ready 📥</Heading>
        <Text style={text}>
          Thanks for grabbing <strong>{guideTitle}</strong> from {SITE_NAME}.
          You can download it again anytime using the button below.
        </Text>
        <Section style={buttonWrap}>
          <Button href={downloadUrl} style={button}>
            Download {guideTitle}
          </Button>
        </Section>
        <Text style={text}>
          If the button doesn't work, copy and paste this link into your browser:
          <br />
          <a href={downloadUrl} style={link}>{downloadUrl}</a>
        </Text>
        {subscribed && (
          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>You're subscribed to updates.</strong> We'll email you a short
              weekly digest when new guides, blog posts, or safety resources are
              added to the site. No spam — ever.
            </Text>
          </Section>
        )}
        <Text style={footer}>Stay safe,<br />The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: GuideDownloadEmail,
  subject: (data: Record<string, any>) =>
    `Your ${data.guideTitle ?? 'safety guide'} is ready`,
  displayName: 'Guide download confirmation',
  previewData: {
    guideTitle: 'Online Privacy Starter Guide',
    downloadUrl: 'https://encrypther.org/guides/online-privacy-starter-guide.pdf',
    subscribed: true,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 18px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0' }
const button = {
  backgroundColor: '#a855f7',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 'bold',
  display: 'inline-block',
}
const link = { color: '#a855f7', wordBreak: 'break-all' as const }
const infoBox = {
  backgroundColor: '#faf5ff',
  borderLeft: '4px solid #a855f7',
  padding: '14px 18px',
  borderRadius: '6px',
  margin: '24px 0',
}
const infoText = { fontSize: '14px', color: '#3a3a3a', lineHeight: '1.5', margin: 0 }
const footer = { fontSize: '13px', color: '#6b7280', margin: '32px 0 0' }
