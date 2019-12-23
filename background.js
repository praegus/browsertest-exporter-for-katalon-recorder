const katalonExtensionId = 'ljdobmomdgdljniojadhoplhkpialdid';

// Periodically send a message to Katalon Recorder with a list of capabilities. 
// If Katalon Recorder does not receive any message for 2 minutes, it will stop communicating with the plugin.

function register() {
    chrome.runtime.sendMessage(
        katalonExtensionId,
        {
            type: 'katalon_recorder_register',
            payload: {
                capabilities: [
                    {
                        id: 'fitnesse_hsac',
                        summary: 'Hsac BrowserTest Wiki Markup (FitNesse)',
                        type: 'export'
                    }
                ]
            }
        }
    );
}

register();
setInterval(register, 60 * 1000);

chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    if (message.type === 'katalon_recorder_export') {
        let payload = message.payload;
        let commands = payload.commands;
        let content = '';
        let extension = 'wiki';
        let mimetype = 'text/plain';

        switch (payload.capabilityId) {
            case 'fitnesse_hsac':
                seleniumToFitNesse = {
                   addSelection: (x) => '| select | ' + x.value + ' | for | ' + locatorToSelector(x.target) + ' |',
                          addSelectionAndWait: (x) => '| select | ' + x.value + ' | for | ' + locatorToSelector(x.target) + ' |',
                          assertAlert: (x) => '| check | alert text | ' + x.target + ' |',
                          assertAlertAndWait: (x) => '| check | alert text | ' + x.target + ' |',
                          assertBodyText: (x) => '| check | value of | css=body | =~/' + x.target + '/ |',
                          assertChecked: (x) => '| check | value of attribute | checked | on | ' + locatorToSelector(x.target) + ' | true |',
                          assertConfirmation: (x) => '| check | alert text | ' + x.target + ' |',
                          assertConfirmationAndWait: (x) => '| check | alert text | ' + x.target + ' |',
                          assertElementNotPresent: (x) => '| ensure | is not visible on page | ' + locatorToSelector(x.target) + ' |',
                          assertElementPresent: (x) => '| ensure | is visible on page | ' + locatorToSelector(x.target) + ' |',
                          assertNotChecked: (x) => '| check not | value of attribute | checked | on | ' + locatorToSelector(x.target) + ' | true |',
                          assertNotConfirmation: (x) => '| check not | alert text | ' + x.target + ' |',
                          assertNotEditable: (x) => '| ensure | is disabled | ' + locatorToSelector(x.target) + ' |',
                          assertNotVisible: (x) => '| ensure | is not visible on page | ' + locatorToSelector(x.target) + ' |',
                          assertText: (x) => '| check | value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          assertTextAndWait: (x) => '| check | normalized value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          assertTextNotPresent: (x) => '| ensure | is not visible on page | ' + locatorToSelector(x.target) + ' |',
                          assertTextPresent: (x) => '| ensure | is visible on page | ' + locatorToSelector(x.target) + ' |',
                          assertTitle: (x) => '| check | page title | ' + x.target + ' |',
                          assertTitleAndWait: (x) => '| check | page title | ' + x.target + ' |',
                          assertValue: (x) => '| check | normalized value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          assertVisible: (x) => '| ensure | is visible | ' + locatorToSelector(x.target) + ' |',
                          captureEntirePageScreenshotAndWait: (x) => '| show | take screenshot | ' + x.target + ' |',
                          check: (x) => '| show | take screenshot | ' + x.target + ' |',
                          click: (x) => '| click | ' + locatorToSelector(x.target) + ' |',
                          clickAndWait: (x) => '| click | ' + locatorToSelector(x.target) + ' |',
                          clickAt: (x) => '| click | ' + locatorToSelector(x.target) + ' | at  offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          clickAtAndWait: (x) => '| click | ' + locatorToSelector(x.target) + ' | at  offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          close: (x) => '| close tab |',
                          contextMenuAndWait: (x) => '| right click | ' + locatorToSelector(x.target) + ' |',
                          contextMenuAt: (x) => '| right click | ' + locatorToSelector(x.target) + ' | at offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          contextMenuAtAndWait: (x) => '| right click | ' + locatorToSelector(x.target) + ' | at offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          deleteAllVisibleCookies: (x) => '| delete all cookies |',
                          doubleClick: (x) => '| double click | ' + locatorToSelector(x.target) + ' |',
                          doubleClickAndWait: (x) => '| double click | ' + locatorToSelector(x.target) + ' |',
                          doubleClickAt: (x) => '| double click | ' + locatorToSelector(x.target) + ' | at offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          doubleClickAtAndWait: (x) => '| double click | ' + locatorToSelector(x.target) + ' | at offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          dragAndDrop: (x) => '| drag and drop | ' + locatorToSelector(x.target) + ' | to offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          dragAndDropAndWait: (x) => '| drag and drop | ' + locatorToSelector(x.target) + ' | to offset X | ' + x.value.split(',')[0] + ' | Y | ' + x.value.split(',')[1] + ' |',
                          dragAndDropToObject: (x) => '| drag and drop | ' + locatorToSelector(x.target) + ' | to | ' + locatorToSelector(x.value) + ' |',
                          dragAndDropToObjectAndWait: (x) => '| drag and drop | ' + locatorToSelector(x.target) + ' | to | ' + locatorToSelector(x.value) + ' |',
                          goBack: (x) => '| back |',
                          mouseOver: (x) => '| hover over | ' + locatorToSelector(x.target) + ' |',
                          mouseOverAndWait: (x) => '| hover over | ' + locatorToSelector(x.target) + ' |',
                          open: (x) => '| open | ' + x.target + ' |',
                          openWindow: (x) => '| open | ' + x.target + ' | in new tab |',
                          openWindowAndWait: (x) => '| open | ' + x.target + ' | in new tab |',
                          pause: (x) => '| wait | ' + x.target + ' | milliseconds |',
                          refreshAndWait: (x) => '| refresh |',
                          runScript: (x) => '| execute script | ' + x.target + ' |',
                          runScriptAndWait: (x) => '| execute script | ' + x.target + ' |',
                          select: (x) => '| select | ' + locatorToSelector(x.value) + ' | as | ' + locatorToSelector(x.target) + ' |',
                          selectAndWait: (x) => '| select | ' + locatorToSelector(x.value) + ' | as | ' + locatorToSelector(x.target) + ' |',
                          selectFrame: (x) => '| switch to frame | ' + locatorToSelector(x.target) + ' |',
                          selectPopUp: (x) => '| switch to next tab |',
                          selectPopUpAndWait: (x) => '| switch to next tab |',
                          sendKeys: (x) => '| enter | ' + x.value + ' | as | ' + locatorToSelector(x.target) + ' |',
                          sendKeysAndWait: (x) => '| enter | ' + x.value + ' | as | ' + locatorToSelector(x.target) + ' |',
                          setTimeout: (x) => '| seconds before timeout | ' + x.target + ' |',
                          storeText: (x) => '| $' + x.value + '= | value of | ' + locatorToSelector(x.target) + ' |',
                          storeTextAndWait: (x) => '| $' + x.value + '= | value of | ' + locatorToSelector(x.target) + ' |',
                          storeTitle: (x) => '| $' + x.value + '= | page title |',
                          storeTitleAndWait: (x) => '| $' + x.value + '= | page title |',
                          storeValue: (x) => '| $' + x.value + '= | value of | ' + locatorToSelector(x.target) + ' |',
                          storeVisible: (x) => '| $' + x.value + '= | is visible | ' + locatorToSelector(x.target) + ' |',
                          type: (x) => '| enter | ' + x.value + ' | as | ' + locatorToSelector(x.target) + ' |',
                          typeAndWait: (x) => '| enter | ' + x.value + ' | as | ' + locatorToSelector(x.target) + ' |',
                          verifyAttribute: (x) => '| check | value of attribute | ' + x.target.split('@')[1] + ' | on | ' + locatorToSelector(x.target.split('@')[0]) + ' | ' + x.value + '',
                          verifyChecked: (x) => '| check | value of attribute | checked | on | ' + locatorToSelector(x.target) + ' | true |',
                          verifyEditable: (x) => '| ensure | is enabled | ' + locatorToSelector(x.target) + ' |',
                          verifyElementPresent: (x) => '| ensure | is visible on page | ' + locatorToSelector(x.target) + ' |',
                          verifyNotChecked: (x) => '| check | value of attribute | checked | on | ' + locatorToSelector(x.target) + ' | false |',
                          verifyNotEditable: (x) => '| ensure | is disabled | ' + locatorToSelector(x.target) + ' |',
                          verifyNotVisible: (x) => '| ensure | is not visible | ' + locatorToSelector(x.target) + ' |',
                          verifyText: (x) => '| check | normalized value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          verifyTextAndWait: (x) => '| check | normalized value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          verifyTextNotPresent: (x) => '| ensure | is not visible on page | ' + locatorToSelector(x.target) + ' |',
                          verifyTextPresent: (x) => '| ensure | is visible on page | ' + locatorToSelector(x.target) + ' |',
                          verifyTitle: (x) => '| check | page title | ' + x.target + ' |',
                          verifyValue: (x) => '| check | normalized value of | ' + locatorToSelector(x.target) + ' | ' + x.value + ' |',
                          verifyVisible: (x) => '| ensure | is visible | ' + locatorToSelector(x.target) + ' |',
                          waitForBodyText: (x) => '| wait for visible | ' + locatorToSelector(x.target) + ' |',
                          waitForTextNotPresent: (x) => '| ensure | is not visible | ' + locatorToSelector(x.target) + ' |',
                          waitForTextPresent: (x) => '| wait for visible | ' + locatorToSelector(x.target) + ' |',
                          waitForTitle: (x) => '| wait for page title | ' + locatorToSelector(x.target) + ' |',
                          windowMaximize: (x) => '| set browser size to maximum |',
                };
                

                let convertedCommands = commands.map((c) => {
                    let equivCommand = seleniumToFitNesse[c.command];

                    if (typeof equivCommand === "function") {
                        let convertedCommand = equivCommand(c);
                        return convertedCommand;
                    } else {
                        return '|# ' + c.command + '| ' + c.target + '| ' + c.value + '|';
                    }
                });

                content = `!| script | browser test |\n` +
                          `${convertedCommands.join('\n')}`;
                extension = 'wiki';
                mimetype = 'text/plain';
                break;

            default:
                content = 'Invalid capability ID';
                extension = 'txt';
                mimetype = 'text/plain';
        }

        sendResponse({
            status: true,
            payload: {
                content: content,
                extension: extension,
                mimetype: mimetype
            }
        });
    }
});


function locatorToSelector(target) {
    let selector = target;
    if (/\@value='(.+)'/.test(target)) {
        selector = target.match(/\[@value='(.+)']/)[1];
    } else if (target.substring(0, 1) === "/" || target.substring(0, 2) === "//") {
        selector = 'xpath=' + target;
    } else if (target.substring(0, 6) === "label=") {
        selector = target.substring(6, target.length);
    } else if (target.substring(0, 12) === "absoluteCSS=") {
        selector = css=target.substring(12, target.length);
    } else if (target.substring(0, 5) === "link=") {
        var offset = 5;
        if (target.substring(5, 11) == 'exact:') {
            offset = 11;
        } else {
            selector = target.substring(offset, target.length);
        }
    }
    return selector;
}