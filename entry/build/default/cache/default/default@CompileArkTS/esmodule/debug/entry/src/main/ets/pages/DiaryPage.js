import relationalStore from '@ohos:data.relationalStore';
var store;
// 获取context
const STORE_CONFIG = {
    name: "RdbTest.db",
    securityLevel: relationalStore.SecurityLevel.S1
};
const valueBucket = {
    'name': 'rose',
    'age': 22,
    'salary': 200.5,
    'blobType': 'u8',
};
class DiaryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.__diaryTitle = new ObservedPropertySimplePU('', this, "diaryTitle");
        this.__diaryContent = new ObservedPropertySimplePU('11', this, "diaryContent");
        this.__alignListItem = new ObservedPropertySimplePU(ListItemAlign.Start, this, "alignListItem");
        this.__timetable = new ObservedPropertyObjectPU([], this, "timetable");
        this.Context = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.diaryTitle !== undefined) {
            this.diaryTitle = params.diaryTitle;
        }
        if (params.diaryContent !== undefined) {
            this.diaryContent = params.diaryContent;
        }
        if (params.alignListItem !== undefined) {
            this.alignListItem = params.alignListItem;
        }
        if (params.timetable !== undefined) {
            this.timetable = params.timetable;
        }
        if (params.Context !== undefined) {
            this.Context = params.Context;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__diaryTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__diaryContent.purgeDependencyOnElmtId(rmElmtId);
        this.__alignListItem.purgeDependencyOnElmtId(rmElmtId);
        this.__timetable.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__diaryTitle.aboutToBeDeleted();
        this.__diaryContent.aboutToBeDeleted();
        this.__alignListItem.aboutToBeDeleted();
        this.__timetable.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get diaryTitle() {
        return this.__diaryTitle.get();
    }
    set diaryTitle(newValue) {
        this.__diaryTitle.set(newValue);
    }
    get diaryContent() {
        return this.__diaryContent.get();
    }
    set diaryContent(newValue) {
        this.__diaryContent.set(newValue);
    }
    get alignListItem() {
        return this.__alignListItem.get();
    }
    set alignListItem(newValue) {
        this.__alignListItem.set(newValue);
    }
    get timetable() {
        return this.__timetable.get();
    }
    set timetable(newValue) {
        this.__timetable.set(newValue);
    }
    itemHead(text, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(text);
            Text.fontSize(20);
            Text.backgroundColor(0xAABBCC);
            Text.width("100%");
            Text.padding(10);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
    }
    itemFoot(num, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('1');
            Text.fontSize(16);
            Text.backgroundColor(0xAABBCC);
            Text.width("100%");
            Text.padding(5);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: '请输入日记标题' });
            TextInput.type(InputType.Normal);
            TextInput.placeholderColor(0x999999);
            TextInput.maxLength(8);
            TextInput.padding(12);
            TextInput.margin(10);
            TextInput.onChange(data => {
                this.diaryTitle = data;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create({ placeholder: '请输入日记内容' });
            TextArea.placeholderColor(0x999999);
            TextArea.padding(12);
            TextArea.margin(10);
            TextArea.onChange(data => {
                this.diaryContent = data;
            });
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('新建', { type: ButtonType.Capsule, stateEffect: true });
            Button.width('90%');
            Button.margin(20);
            Button.onClick(() => {
                relationalStore.getRdbStore(getContext(this), STORE_CONFIG, function (err, rdbStore) {
                    store = rdbStore;
                    if (err) {
                        console.error(`Get RdbStore failed, err: ${err}`);
                        return;
                    }
                    console.info(`Get RdbStore successfully.`);
                    this.executeSql("CREATE TABLE table_name(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50),age INT)");
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('新建', { type: ButtonType.Capsule, stateEffect: true });
            Button.width('90%');
            Button.margin(20);
            Button.onClick(() => {
                let diaryD = {
                    title: this.diaryTitle,
                    content: this.diaryContent
                };
                this.timetable.push(diaryD);
                store.insert('EMPLOYEE', valueBucket, function (err, val) {
                    if (err)
                        console.info('bad');
                    console.info('good');
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: 20 });
            List.width('70%');
            List.height('70%');
            List.sticky(StickyStyle.Header | StickyStyle.Footer);
            List.border({ width: 3, color: Color.Black });
            List.alignListItem(this.alignListItem);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ListItemGroup.create({ header: this.itemHead.bind(this, item.title), footer: this.itemFoot.bind(this, 1) });
                    ListItemGroup.borderRadius(20);
                    ListItemGroup.divider({ strokeWidth: 1, color: Color.Blue });
                    if (!isInitialRender) {
                        ListItemGroup.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.content);
                            Text.width("100%");
                            Text.height(25);
                            Text.fontSize(20);
                            Text.textAlign(TextAlign.Center);
                            Text.backgroundColor(0xFFFFFF);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.content);
                            Text.width("100%");
                            Text.height(25);
                            Text.fontSize(20);
                            Text.textAlign(TextAlign.Center);
                            Text.backgroundColor(0xFFFFFF);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
                ListItemGroup.pop();
            };
            this.forEachUpdateFunction(elmtId, this.timetable, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new DiaryPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=DiaryPage.js.map