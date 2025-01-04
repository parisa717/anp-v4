declare global {
  /**
   * Shared kernel
   */

  /**
   * Source: https://github.com/noveogroup-amorgunov/nukeapp
   *
   * ⚠️ FSD
   *
   * Its hack way to export redux inferring types from @/app
   * and use it in @/shared/model/hooks.ts
   */

  declare type RootState = import('../app/store').RootState
  declare type AppDispatch = import('../app/store').AppDispatch
}

export {}
