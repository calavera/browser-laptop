var VaultRepromptDialog=function(a){RepromptDialog.call(this,a)};VaultRepromptDialog.prototype=Object.create(RepromptDialog.prototype);VaultRepromptDialog.prototype.constructor=VaultRepromptDialog;
(function(){VaultRepromptDialog.prototype.open=function(a){RepromptDialog.prototype.open.call(this,$.extend(a,{defaultData:{delayRepromptTime:bg.Preferences.get("reprompttime")}}))};VaultRepromptDialog.prototype.initialize=function(a){RepromptDialog.prototype.initialize.apply(this,arguments);var b=this;b.inputFields.delayRepromptTime.onChange(function(a){b.inputFields.delayReprompt.setValue(0<parseInt(a))});b.inputFields.delayReprompt.onChange(function(a){a||b.inputFields.delayRepromptTime.setValue("0")})};
VaultRepromptDialog.prototype.success=function(a){bg.Preferences.set("reprompttime",a.delayRepromptTime);bg.set_last_reprompt_time();"function"===typeof this.data.successCallback?this.data.successCallback():bg.repromptSuccess()};VaultRepromptDialog.prototype.validateReprompt=function(a){bg.make_lp_key_hash_iterations(bg.g_username,a.params.password,bg.get_key_iterations(bg.g_username),function(b){b===LPProxy.getLocalKey()?a.success(a.params):a.repromptFailed()})}})();