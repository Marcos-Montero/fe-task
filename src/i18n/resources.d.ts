import en from "./locales/en.json"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "app"
    resources: {
      app: typeof en
    }
    returnNull: false
  }
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "app"
    resources: {
      app: typeof en
    }
  }
}
