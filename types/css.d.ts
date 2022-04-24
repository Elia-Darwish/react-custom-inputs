import * as CSS from 'csstype'

declare module 'csstype' {
  interface Properties {
    // Add a CSS Custom Property
    '--size'?: CSS.PropertyValue<number | string>
    '--radius'?: CSS.PropertyValue<number | string>
    '--bg-active'?: CSS.PropertyValue<number | string>

    // ...or allow any other property
    [index: string]: any
  }
}
