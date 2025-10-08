import React from "react"
import { DataProvider } from "@dhis2/app-runtime"

export const decorators = [
  (Story: any) => (
    <DataProvider baseUrl="https://play.im.dhis2.org/stable-2-40-9/" apiVersion={40}>
      <Story />
    </DataProvider>
  ),
]
