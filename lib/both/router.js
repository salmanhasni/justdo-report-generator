/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
_.extend(ReportGenerator.prototype, {
  setupRouter() {
    Router.route('/report-generator', function() {
      this.render('report_generator_page');

    }
    ,
      {name: 'report_generator_page'});

    if (Meteor.isClient) {
      APP.executeAfterAppLibCode(() => JD.registerPlaceholderItem("report-generator", {
        data: {
          html: `\
<a class="text-dark text-uppercase d-flex align-items-center text-decoration-none" href="/report-generator">
<div class="menu-item-icon bg-primary p-2 text-white shadow-sm rounded-sm">
  <i class="fa fa-fw fa-handshake-o icons" aria-hidden="true"></i>
</div>
${ReportGenerator.custom_page_label}
</a>\
`
        },

        domain: "drawer-pages",
        position: 100,

        listingCondition() {
          return true;
        }
      }
      ));
    }

  }
}
);
