// нужно для типизации конфига при использовании аддона storybook-addon-multiselect, при импорте библиотеки появляется ошибка ts.
import { ReactNode } from 'react'
import { API } from '@storybook/manager-api'

  export type AddonConfig = AddonDisabled | Addon

  export type AddonDisabled = {
    disable: boolean
  }

  export type Addon = { [key: string]: AddonEntry }

  export type AddonEntry = {
    name?: string
    description?: string
    icon?: ReactNode
    elements: Array<Reset | SingleSelect | MultiSelect>
    viewMode?: 'story' | 'docs' | 'both'
  }

  export type Reset = {
    type: 'reset'
  }

  export type SelectSharedProps = {
    title?: string
    allowEmpty?: boolean
    queryKey: string
    localStorageKey?: string
  }

  export type SingleSelectOnChange = (
    value: string | undefined,
    storybookApi: API
  ) => string | undefined
  export type SingleSelect = SelectSharedProps & {
    type: 'singleSelect'
    options: Option[]
    defaultValue?: string
    onChange?: string | SingleSelectOnChange
  }

  export type MultiSelectOnChange = (
    value: string[],
    storybookApi: API
  ) => string[]
  export type MultiSelect = SelectSharedProps & {
    type: 'multiSelect' | 'userDefinedSelect'
    options: Option[]
    defaultValues?: string[]
    onChange?: string | MultiSelectOnChange
  }

  export type Option = {
    value: string
    title: ReactNode
    right?: ReactNode
    icon?: ReactNode
  }
