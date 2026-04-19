/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as guideDownloadConfirmation } from './guide-download-confirmation.tsx'
import { template as weeklyDigest } from './weekly-digest.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'guide-download-confirmation': guideDownloadConfirmation,
  'weekly-digest': weeklyDigest,
}
