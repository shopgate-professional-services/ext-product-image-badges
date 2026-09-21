import { hasTriggerTag, hasTriggerProp, isTriggered } from './index';

const triggerProps = [{
  label: 'Warranty',
  value: '3 years',
}];

describe('Helpers', () => {
  describe('hasTriggerTag', () => {
    it('should return true when a product tag matches a trigger tag', () => {
      expect(hasTriggerTag(['sale', 'new'], ['new'])).toBe(true);
    });

    it('should return false when no product tag matches', () => {
      expect(hasTriggerTag(['sale'], ['new'])).toBe(false);
    });

    it('should return false when the product has no tags', () => {
      expect(hasTriggerTag(undefined, ['new'])).toBe(false);
    });
  });

  describe('hasTriggerProp', () => {
    it('should match additional properties by label and value', () => {
      expect(hasTriggerProp([{
        label: 'Warranty',
        value: '3 years',
      }], undefined, triggerProps)).toBe(true);
    });

    it('should not match when only the label is equal', () => {
      expect(hasTriggerProp([{
        label: 'Warranty',
        value: '5 years',
      }], undefined, triggerProps)).toBe(false);
    });

    it('should fall back to properties when there are no additional properties', () => {
      expect(hasTriggerProp(undefined, [{
        label: 'Warranty',
        value: '3 years',
      }], triggerProps)).toBe(true);
    });

    it('should return false when the product has no properties', () => {
      expect(hasTriggerProp(undefined, undefined, triggerProps)).toBe(false);
    });
  });

  describe('isTriggered', () => {
    it('should trigger on a tag', () => {
      expect(isTriggered({ tags: ['new'] }, {
        triggerTags: ['new'],
        triggerProps: [],
      })).toBe(true);
    });

    it('should trigger on a property', () => {
      expect(isTriggered({
        additionalProperties: [{
          label: 'Warranty',
          value: '3 years',
        }],
      }, {
        triggerTags: [],
        triggerProps,
      })).toBe(true);
    });

    it('should not trigger without product data', () => {
      expect(isTriggered(null, {
        triggerTags: ['new'],
        triggerProps,
      })).toBe(false);
    });
  });
});
