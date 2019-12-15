Template.report_generator_project_drop_down_item.helpers({

});


Template.report_generator_project_drop_down_item.events({
  "click #execution-report"(e, template) {
    Modal.show("report_generator_project_report");
  }
})
