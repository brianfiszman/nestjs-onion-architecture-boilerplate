import { convertUnixToDate, removeHTMLFromField } from '../../src/domain/helpers';
import { random } from 'faker';

describe('Test normalizer helper functions', () => {
  describe('[removeHTMLFromField]', () => {
    it('Should remove html tags from string', () => {
      const word = random.word();
      const words = random.words();

      const textWithTags = '<b>' + word + '</b>&nbsp;<h1>' + words + '</h1>';
      const result = removeHTMLFromField(textWithTags);

      expect(result).toBe(word + words);
    });

    it('Should return the same input value if received input is not string', () => {
      const result = removeHTMLFromField(1);

      expect(result).toBe(1);
    });
  });

  describe('[convertUnixToDate]', () => {
    it('Should return a valid date from unix string', () => {
      const date = new Date();
      const unixDate = date.getTime() / 1000;

      const result = convertUnixToDate(unixDate.toString());

      expect(result).toBe(date.toISOString());
    });
  });
});
