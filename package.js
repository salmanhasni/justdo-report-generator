Package.describe({
  name: "justdoinc:report-generator",
  version: "0.0.1",
  summary: "",
  git: "https://github.com/salmanhasni/justdo-report-generator"
});

client = "client"
server = "server"
both = [client, server]

Package.onUse(function (api) {
  api.versionsFrom("1.4.1.1");

  api.use("coffeescript", both);
  api.use("underscore", both);
  api.use("mongo", both);

  // Uncomment if you want to use NPM peer dependencies using
  // checkNpmVersions.
  //
  // Introducing new NPM packages procedure:
  //
  // * Uncomment the lines below.
  // * Add your packages to the main web-app package.json dependencies section.
  // * Call $ meteor npm install
  // * Call $ meteor npm shrinkwrap
  //
  // Add to the peer dependencies checks to one of the JS/Coffee files of your package,
  // Example:
  //
  //   import { checkNpmVersions } from "meteor/tmeasday:check-npm-versions"
  //
  //   checkNpmVersions({
  //     'colors': '1.1.x'
  //   }, 'justdoinc:report-generator')
  // api.use("ecmascript", both);
  // api.use("tmeasday:check-npm-versions@0.3.1", both);

  // api.use("stevezhu:lodash@4.17.2", both);
  api.use("templating", client);
  api.use('fourseven:scss@3.2.0', client);
  api.use("peppelg:bootstrap-3-modal@1.0.4", client);

  api.use("aldeed:simple-schema@1.5.3", both);
  api.use('aldeed:collection2@2.3.2', both);
  api.use("raix:eventemitter@0.1.1", both);
  api.use("meteorspark:util@0.2.0", both);
  api.use("meteorspark:logger@0.3.0", both);
  api.use("justdoinc:justdo-helpers@1.0.0", both);
  api.use("iron:router@1.1.2", both);

  api.use("justdoinc:justdo-analytics@1.0.0", both);

  api.use("matb33:collection-hooks@0.8.4", both);

  api.use("reactive-var", both);
  api.use("tracker", client);

  api.addFiles("lib/both/analytics.js", both);

  api.addFiles("lib/both/init.js", both);
  api.addFiles("lib/both/static.js", both);
  api.addFiles("lib/both/router.js", both);
  api.addFiles("lib/both/errors-types.js", both);
  api.addFiles("lib/both/api.js", both);
  api.addFiles("lib/both/schemas.js", both);

  api.addFiles("lib/server/api.js", server);
  api.addFiles("lib/server/allow-deny.js", server);
  api.addFiles("lib/server/collections-hooks.js", server);
  api.addFiles("lib/server/collections-indexes.js", server);
  api.addFiles("lib/server/methods.js", server);
  api.addFiles("lib/server/publications.js", server);

  api.addFiles("lib/client/api.js", client);
  api.addFiles("lib/client/methods.js", client);

  api.addFiles("lib/client/project-conf/project-conf.sass", client);
  api.addFiles("lib/client/project-conf/project-conf.html", client);
  api.addFiles("lib/client/project-conf/project-conf.js", client);

  api.addFiles("lib/client/plugin-page/plugin-page.sass", client);
  api.addFiles("lib/client/plugin-page/plugin-page.html", client);
  api.addFiles("lib/client/plugin-page/plugin-page.js", client);

  api.addFiles("lib/client/task-pane-section/task-pane-section-registrar.js", client);

  api.addFiles("lib/client/task-pane-section/task-pane-section.sass", client);
  api.addFiles("lib/client/task-pane-section/task-pane-section.html", client);
  api.addFiles("lib/client/task-pane-section/task-pane-section.js", client);

  api.addFiles("lib/client/report/report.sass", client);
  api.addFiles("lib/client/report/report.html", client);
  api.addFiles("lib/client/report/report.js", client);

  api.addFiles("lib/client/drop-down-item/drop-down-item-registrar.js", client);
  api.addFiles("lib/client/drop-down-item/drop-down-item.html", client);
  api.addFiles("lib/client/drop-down-item/drop-down-item.js", client);


  // Uncomment only in packages that integrate with the main applications
  // Pure logic packages should avoid any app specific integration.
  api.use("meteorspark:app@0.3.0", both);
  api.use("justdoinc:justdo-webapp-boot@1.0.0", both);
  api.addFiles("lib/both/app-integration.js", both);
  // Note: app-integration need to load last, so immediateInit procedures in
  // the server will have the access to the apis loaded after the init.js
  // file.

  api.export("ReportGenerator", both);
});
