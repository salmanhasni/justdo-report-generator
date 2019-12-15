_.extend(ReportGenerator.prototype, {
  _immediateInit() {
  },

  _deferredInit() {
    if (this.destroyed) {
      return;
    }

    // Defined in methods.coffee
    this._setupMethods();

    // Defined in publications.coffee
    this._setupPublications();

    // Defined in allow-deny.coffee
    this._setupAllowDenyRules();

    // Defined in collections-hooks.coffee
    this._setupCollectionsHooks();

    // Defined in collections-indexes.coffee
    this._ensureIndexesExists();

  },

  performInstallProcedures(project_doc, user_id) {
    // Called when plugin installed for project project_doc._id
    console.log(`Plugin ${JustdoFormulaFields.project_custom_feature_id} installed on project ${project_doc._id}`);

  },

  performUninstallProcedures(project_doc, user_id) {
    // Called when plugin uninstalled from project project_doc._id

    // Note, isn't called on project removal

    console.log(`Plugin ${JustdoFormulaFields.project_custom_feature_id} removed from project ${project_doc._id}`);

  }
}
);
