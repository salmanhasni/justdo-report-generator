_.extend(ReportGenerator.prototype, {
  _immediateInit() {
  },

  _deferredInit() {
    if (this.destroyed) {
      return;
    }

    this.registerConfigTemplate();
    if(ReportGenerator.add_pane_tab) {
      this.registerTaskPaneSection();
    }
    this.registerPrintButtonItem();
    this.setupCustomFeatureMaintainer();
  },

  setupCustomFeatureMaintainer() {
    const custom_feature_maintainer =
      APP.modules.project_page.setupProjectCustomFeatureOnProjectPage(ReportGenerator.project_custom_feature_id, {
        installer: () => {
          if (ReportGenerator.add_pseudo_field) {
            APP.modules.project_page.setupPseudoCustomField(ReportGenerator.pseudo_field_id, {
              label: ReportGenerator.pseudo_field_label,
              field_type: ReportGenerator.pseudo_field_type,
              grid_visible_column: true,
              grid_editable_column: true,
              default_width: 200
            }
            );
          }

        },

        destroyer: () => {
          if (ReportGenerator.add_pseudo_field) {
            APP.modules.project_page.removePseudoCustomFields(ReportGenerator.pseudo_field_id);
          }

        }
      }
      );

    this.onDestroy(() => {
      custom_feature_maintainer.stop();

    });

  }
}
);
