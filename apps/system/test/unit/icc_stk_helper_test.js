'use strict';
/* global MockL10n, MocksHelper, STKHelper */

require('/shared/js/stk_helper.js');
require('/shared/test/unit/mocks/mock_l20n.js');

'use strict';

var mocksForIcc = new MocksHelper([
  'L10n'
]).init();

suite('STK (stk_helper) >', function() {
  mocksForIcc.attachTestHelpers();
  var realMozL10n;
  var stkTestCommands = {};

  suiteSetup(function() {
    realMozL10n = document.l10n;
    document.l10n = MockL10n;
  });

  suiteTeardown(function() {
    document.l10n = realMozL10n;
  });

  stkTestCommands = {
    STK_CMD_NO_ICONS: {
      iccId: '1010011010',
      command: {
        commandNumber: 1,
        commandQualifier: 0,
        options: {
          text: 'stk display test text'
        }
      }
    },
    STK_CMD_WITH_ICONS_SELF_EXPLANATORY: {
      iccId: '1010011010',
      command: {
        commandNumber: 1,
        commandQualifier: 0,
        options: {
          text: 'stk display test text',
          iconSelfExplanatory: true,
          icons: [{'pixels': [0xFFFFFFFF]}]
        }
      }
    },
    STK_CMD_WITH_NO_TEXT: {
      iccId: '1010011010',
      command: {
        commandNumber: 1,
        commandQualifier: 0,
        options: {
          text: ''
        }
      }
    },
    STK_CMD_WITH_SPECIFIC_TEXT: {
      iccId: '1010011010',
      command: {
        commandNumber: 1,
        commandQualifier: 0,
        options: {
          confirmMessage: 'specific text'
        }
      }
    }
  };

  test('should use the text included in the message', function() {
    var testCmd = stkTestCommands.STK_CMD_NO_ICONS;
    var text = STKHelper.getMessageText(testCmd.command.options);
    assert.deepEqual(text, { raw: testCmd.command.options.text });
  });

  test('should return an empty string', function() {
    var testCmd = stkTestCommands.STK_CMD_WITH_NO_TEXT;
    var text = STKHelper.getMessageText(testCmd.options);
    assert.deepEqual(text, { raw: '' });
  });

  test('should return the specific text', function() {
    var testCmd = stkTestCommands.STK_CMD_WITH_SPECIFIC_TEXT;
    var text = STKHelper.getMessageText(testCmd.command.options);
    assert.deepEqual(text, { raw: testCmd.command.options.text });
  });

  test('should return an empty string', function() {
    var testCmd = stkTestCommands.STK_CMD_WITH_ICONS_SELF_EXPLANATORY;
    var text = STKHelper.getMessageText(testCmd.command.options);
    assert.deepEqual(text, { raw: '' });
  });

  test('should return the default text', function() {
    var testCmd = stkTestCommands.STK_CMD_WITH_NO_TEXT;
    var text = STKHelper.getMessageText(testCmd.command.options,
      'default-text');
    assert.deepEqual(text, { id: 'default-text', args: undefined });
  });

  test('should return the default text with args', function() {
    var testCmd = stkTestCommands.STK_CMD_WITH_NO_TEXT;
    var text = STKHelper.getMessageText(testCmd.command.options, 'default-text',
      {number: 111111});
    assert.deepEqual(text, { id: 'default-text', args: {
      number: 111111
    }});
  });

});
