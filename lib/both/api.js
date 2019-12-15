_.extend(ReportGenerator.prototype, {
  _bothImmediateInit() {
    // @_bothImmediateInit runs before the specific env's @_immediateInit()

    // Add here code that should run, in the Server and Client, during the JS
    // tick in which we create the object instance.

    this.setupRouter();

  },

  _bothDeferredInit() {
    // @_bothDeferredInit runs before the specific env's @_deferredInit()

    // Add here code that should run, in the Server and Client, after the JS
    // tick in which we created the object instance.

    if (this.destroyed) {
      return;
    }

  },

  isPluginInstalledOnProjectDoc(project_doc) {
    return APP.projects.isPluginInstalledOnProjectDoc(ReportGenerator.project_custom_feature_id, project_doc);
  },

  getProjectDocIfPluginInstalled(project_id) {
    return this.projects_collection.findOne({_id: project_id, "conf.custom_features": ReportGenerator.project_custom_feature_id});
  }
}
);
