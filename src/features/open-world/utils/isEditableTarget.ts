/**
 * True when a key event comes from a field that uses the keyboard itself
 * (number/text/range inputs, textareas), so game shortcuts should stay out of the way.
 * Checkboxes and buttons are excluded: after clicking them, movement keys should still work.
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) return target.type !== 'checkbox' && target.type !== 'radio';
  return target instanceof HTMLElement && target.isContentEditable;
}
