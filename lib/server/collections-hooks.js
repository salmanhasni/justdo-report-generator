/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
_.extend(ReportGenerator.prototype, {
  _setupCollectionsHooks() {
    this.projectsInstallUninstallProcedures();

  },

  projectsInstallUninstallProcedures() {
    const self = this;

    self.projects_collection.after.update(function(user_id, doc, fieldNames, modifier, options) {
      let custom_features;
      const feature_id = ReportGenerator.project_custom_feature_id; // shortcut

      if ((custom_features = modifier.$set != null ? modifier.$set["conf.custom_features"] : undefined) != null) {
        const previous_custom_features = __guard__(this.previous != null ? this.previous.conf : undefined, x => x.custom_features);
        const new_custom_features = doc.conf != null ? doc.conf.custom_features : undefined;

        let plugin_was_installed_before = false;
        if (_.isArray(previous_custom_features)) {
          plugin_was_installed_before = Array.from(previous_custom_features).includes(feature_id);
        }

        let plugin_is_installed_after = false;
        if (_.isArray(new_custom_features)) {
          plugin_is_installed_after = Array.from(new_custom_features).includes(feature_id);
        }

        if (!plugin_was_installed_before && plugin_is_installed_after) {
          self.performInstallProcedures(doc, user_id);
        }

        if (plugin_was_installed_before && !plugin_is_installed_after) {
          self.performUninstallProcedures(doc, user_id);
        }
      }

    });

  }
}
);
function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}