_.extend(ReportGenerator.prototype, {
    registerPrintButtonItem() {
      JD.registerPlaceholderItem("report-generator", {
        data: {
          template: "report_generator_project_drop_down_item",
        },
        domain: "print-dropdown-bottom",
        position: 100,
        listingCondition() {
          return true;
        }
      });
    }
});
