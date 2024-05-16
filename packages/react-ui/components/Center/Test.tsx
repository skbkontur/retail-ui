export interface Created { testProp: number }

export function Test(props: Created) {
  return props.testProp;
}
