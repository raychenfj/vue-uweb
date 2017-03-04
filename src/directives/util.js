/**
 * skip update if the binding value is empty or equal to old value
 */
export function skip (binding) {
  return binding.value === '' || binding.value === undefined || binding.value === null || binding.value === binding.oldValue
}
