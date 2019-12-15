/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
_.extend(ReportGenerator.prototype, {
  registerTaskPaneSection() {
    const module = APP.modules.project_page;

    // Register the new section manager
    const ReportGeneratorTaskPaneSection = function(options) {

      // This will be called as a JS constructor (with the `new` word) everytime the
      // task pane is Created by blaze, you can access the instance created under
      // XXX
      // Before we destroy the instance we will call @_destroy() - you can implement
      // such a method if you need one.
      module.TaskPaneSection.call(this, options);

      return this;
    };

    // Note that we register this section under the "ReportGeneratorTaskPaneSection" id
    // which we use later
    module.registerTaskPaneSection("ReportGeneratorTaskPaneSection", ReportGeneratorTaskPaneSection);

    // Inherit prototype common to all task pane sections
    // (at the moment it only include a @_destroy() method that does
    // nothing, so we can safely call @_destroy() even if you don't
    // need to implement one).
    Util.inherits(ReportGeneratorTaskPaneSection, module.TaskPaneSection);

    // Each item in the grid can have different item type (examples: default, section
    // header, ticket queue header) here we add the section to the **default** item type
    // task pane tabs list.
    const {
      task_pane_sections
    } = module.items_types_settings.default;

    // Note that we change the array in-place, don't create a new array
    // use splice to put between two items
    const section_definition = {
      id: "report-generator",
      type: "ReportGeneratorTaskPaneSection", // the name of the template derives from the type
      options: {
        title: ReportGenerator.task_pane_tab_label,
        titleInfo() { return ""; }
      }, // Can be a reactive resource
      section_options: {}
    };

    const report_generator_section_position =
      lodash.findIndex(task_pane_sections, section => section.id === "item-activity");

    Tracker.autorun(() => {
      if (__guard__(APP.modules.project_page.curProj(), x => x.isCustomFeatureEnabled(ReportGenerator.project_custom_feature_id))) {
        if (!_.any(task_pane_sections, section => section.id === "report-generator")) {
          if (report_generator_section_position !== -1) {
            // If the item-activity section exist, put the file manager after it
            task_pane_sections.splice(report_generator_section_position + 1, 0, section_definition);
          } else {
            task_pane_sections.push(section_definition);
          }

          return APP.modules.project_page.invalidateItemsTypesSettings();
        }

      } else {
        let index = -1;
        _.find(task_pane_sections, (section, i) => {
          if (section.id === "report-generator") {
            index = i;
            return true;
          }
        });

        if (index !== -1) {

          task_pane_sections.splice(index, 1);
          return APP.modules.project_page.invalidateItemsTypesSettings();
        }
      }
    });

  }
}
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
