import { useTranslations } from 'next-intl'
import React from 'react'

export default function Dosc() {
  const t = useTranslations()
  return (
    <div>
      <span>Dosc</span>
      <span>{t("Home.learn")}</span>
    </div>
  )
}
