//@param context
import preferences from '@ohos:data.preferences';
import router from '@ohos:router';
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('欢迎登陆', this, "message");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.Context = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.Context !== undefined) {
            this.Context = params.Context;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get password() {
        return this.__password.get();
    }
    set password(newValue) {
        this.__password.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/Index.ets(14:5)");
            Row.height('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/Index.ets(15:7)");
            Column.width('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //
            Image.create({ "id": 16777263, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/Index.ets(18:9)");
            //
            Image.width(100);
            //
            Image.height(100);
            //
            Image.margin({ bottom: '20vp' });
            if (!isInitialRender) {
                //
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //
            TextInput.create({ placeholder: '密码' });
            TextInput.debugLine("pages/Index.ets(24:9)");
            //
            TextInput.type(InputType.Password);
            //
            TextInput.placeholderColor(0x999999);
            //
            TextInput.maxLength(8);
            //
            TextInput.padding(12);
            //
            TextInput.margin(10);
            //
            TextInput.onChange(data => {
                this.password = data;
                console.info(this.password);
            });
            if (!isInitialRender) {
                //
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('确定', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("pages/Index.ets(35:9)");
            Button.width('90%');
            Button.margin(20);
            Button.onClick(() => {
                let password = this.password;
                preferences.getPreferences(getContext(this), 'password')
                    .then((preferences) => {
                    preferences.has('password', (err, val) => {
                        if (val) {
                            preferences.get('password', 'default').then((value) => {
                                console.info(value + password);
                                if (password.length != value.toString().length) {
                                    return;
                                }
                                for (let i = 0; i <= password.length - 1; i++) {
                                    if (password[i] != value[i])
                                        return;
                                }
                                router.pushUrl({
                                    url: 'pages/MainPage'
                                });
                                console.info('读取' + value);
                                router.pushUrl({ url: "pages/MainPage", params: { "password": this.password } });
                            });
                            preferences.flush();
                            return;
                        }
                        if (err) {
                            preferences.put('password', password, (val) => {
                                if (val) {
                                    console.info('写入' + password);
                                }
                            });
                            preferences.flush();
                            return;
                        }
                        else {
                            if (err) {
                            }
                            preferences.put('password', password, (err) => {
                                if (err) {
                                    console.info("Failed to put value of 'password'. code =" + err.code + ", message =" + err.message);
                                }
                                else {
                                    console.info("Succeeded in putting value of 'password'.");
                                }
                            });
                        }
                        console.info('初始化' + password);
                        preferences.flush();
                        return;
                    });
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MainPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Index.js.map