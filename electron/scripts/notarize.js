require('dotenv').config();
const { notarize } = require('electron-notarize');
console.log("notarize");
exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    console.log("notarize", electronPlatformName);
    console.log("notarize", appOutDir);

    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;
    console.log("notarize", appName);
    notarize({
        appBundleId: 'com.miwallet.medico',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: 'ibrito@britech.mx',//process.env.APPLEID,
        appleIdPassword: 'bntj-samd-ethz-vvfa', //process.env.APPLEIDPASS,
        teamId: "VK84D5T3UA"
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
};