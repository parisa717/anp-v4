/**
 * This is the version of hasProperty that has type guards unlike lodash .has() function
 */

export const hasProperty = <Obj, Prop extends string>(obj: Obj, prop: Prop): obj is Obj & Record<Prop, unknown> => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
