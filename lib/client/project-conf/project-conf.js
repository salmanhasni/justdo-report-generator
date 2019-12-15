/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
_.extend(ReportGenerator.prototype, {
  registerConfigTemplate() {
    APP.executeAfterAppClientCode(function() {
      const module = APP.modules.project_page;
      return module.project_config_ui.registerConfigTemplate("report_generator_project_config", {
        section: "extensions",
        template: "report_generator_project_config",
        priority: 100
      }
      );
    });

  }
}
);

const module_id = ReportGenerator.project_custom_feature_id;

const curProj = () => APP.modules.project_page.curProj();

Template.report_generator_project_config.helpers({
  isModuleEnabled() {
    return curProj().isCustomFeatureEnabled(module_id);
  },

  pluginName() {
    return ReportGenerator.plugin_human_readable_name;
  }
});

Template.report_generator_project_config.events({
  "click .project-conf-report-generator-config"() {
    const proj = curProj();

    if (proj.isCustomFeatureEnabled(module_id)) {
      return curProj().disableCustomFeatures(module_id);
    } else {
      return curProj().enableCustomFeatures(module_id);
    }
  }
});
