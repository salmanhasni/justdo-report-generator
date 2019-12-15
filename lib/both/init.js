/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
global.ReportGenerator;
const default_options = {};

const options_schema = {
  both: {
    projects_collection: {
      type: "skip-type-check",
      optional: false,
      bind_to_instance: true
    },

    tasks_collection: {
      type: "skip-type-check",
      optional: false,
      bind_to_instance: true
    }
  }
};

// options_schema
// ==============
//
// If options_schema is an object, we use it to clean and validate
// the contructor options. (otherwise ignored completly).
//
// *Notes:*
//
// * by using options_schema you must define any option that
//   the constructor can receive, options that won't be defined will be
//   omitted from the @options object.
//
// * default_options above is applied to the received options before
//   we process options_schema.
//
// * If validation fails an `@_error "invalid-options", message`
//   will be thrown, with message detailing in a human readable way the
//   validation issues.
//
// options_schema format
// ---------------------
//
// An object with the schema for options defined for each
// platform (both/server/client, server/client takes
// precedence over both).
//
// *The bind_to_instance schema option*
//
// We will recognize the `bind_to_instance` schema option.
// If `bind_to_instance` is set to true the option value
// will be assigned automatically to @[option_name].
// If `bind_to_instance` is false or doesn't exist, it is
// ignored.
//
// Note, at the moment for objects that inherits from
// constructors, it is best to ignore type checking
// by setting type to: "skip-type-check"
//
// *Example:*
//
//   options_schema =
//     both:
//       tasks_collection:
//         type: "skip-type-check"
//         optional: false
//         bind_to_instance: true
//       op_b:
//         type: Number
//         optional: true
//         defaultValue: 30
//     client:
//       op_c:
//         type: Number
//         optional: false
//     server:
//       op_d:
//         type: Number
//         optional: true
//         defaultValue: 30

ReportGenerator = function(options) {
  // skeleton-version: v3.0.0

  // Developer, avoid changing this constuctor, to do stuff on init
  // for both server & client, use below the: @_bothImmediateInit()

  EventEmitter.call(this);

  this.destroyed = false;

  this.logger = Logger.get("report-generator");
  this.JA = JustdoAnalytics.setupConstructorJA(this, "report-generator");

  this.logger.debug("Init begin");

  this._on_destroy_procedures = [];

  this.options = _.extend({}, default_options, options);
  if (!_.isEmpty(options_schema)) {
    // If options_schema is set, use it to apply strict structure on
    // @options.
    //
    // Clean and validate @options according to options_schema.
    // invalid-options error will be thrown for invalid options.
    // Takes care of binding options with bind_to_instance to
    // the instance.
    this.options =
      JustdoHelpers.loadOptionsWithSchema(
        options_schema, this.options, {
          self: this,
          additional_schema: { // Adds the `events' option to the permitted fields
            events: {
              type: Object,
              blackbox: true,
              optional: true
            }
          }
        }
      );
  }

  JustdoHelpers.loadEventEmitterHelperMethods(this);
  this.loadEventsFromOptions(); // loads @options.events, if exists

  this._on_destroy_procedures = [];

  this._attachCollectionsSchemas();

  if (Meteor.isClient) {
    // React to invalidations
    if (Tracker.currentComputation != null) {
      Tracker.onInvalidate(() => {
        this.logger.debug("Enclosing computation invalidated, destroying");
        return this.destroy();
      }); // defined in client/api.coffee
    }

    // on the client, call @_immediateInit() in an isolated
    // computation to avoid our init procedures from affecting
    // the encapsulating computation (if any)
    Tracker.nonreactive(() => {
      this._bothImmediateInit();

      return this._immediateInit();
    });
  } else {
    this._bothImmediateInit();

    this._immediateInit();
  }

  Meteor.defer(() => {
    this._bothDeferredInit();
    return this._deferredInit();
  });

  this.logger.debug("Init done");

  return this;
};

Util.inherits(ReportGenerator, EventEmitter);

_.extend(ReportGenerator.prototype, {
  _error: JustdoHelpers.constructor_error,

  onDestroy(proc) {
    // not to be confused with @destroy, onDestroy registers procedures to be called by @destroy()
    this._on_destroy_procedures.push(proc);

  },

  destroy() {
    if (this.destroyed) {
      this.logger.debug("Destroyed already");

      return;
    }

    _.each(this._on_destroy_procedures, proc => proc());

    this.destroyed = true;

    this.logger.debug("Destroyed");

  }
}
);
