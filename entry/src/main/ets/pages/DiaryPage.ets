import relationalStore from '@ohos.data.relationalStore';
import rdb from '@ohos.data.rdb';
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

@Entry
@Component
struct DiaryPage {
  @State message: string = 'Hello World'
  @State diaryTitle: string = ''
  @State diaryContent: string = '11'
  @State alignListItem: ListItemAlign = ListItemAlign.Start

  @State timetable: any = []

  Context: Context

  @Builder itemHead(text: string) {
    Text(text)
      .fontSize(20)
      .backgroundColor(0xAABBCC)
      .width("100%")
      .padding(10)
      .textAlign(TextAlign.Center)
  }

  @Builder itemFoot(num: number) {
    Text('1')
      .fontSize(16)
      .backgroundColor(0xAABBCC)
      .width("100%")
      .padding(5)
  }

  build() {
    Row() {
      Column() {


        TextInput({ placeholder: '请输入日记标题' })
          .type(InputType.Normal)
          .placeholderColor(0x999999)
          .maxLength(8)
          .padding(12)
          .margin(10)
          .onChange(data => {
            this.diaryTitle = data
          })

        TextArea({ placeholder: '请输入日记内容' })
          .placeholderColor(0x999999)
          .padding(12)
          .margin(10)
          .onChange(data => {
            this.diaryContent = data
          })
        Button('新建', { type: ButtonType.Capsule, stateEffect: true })
          .width('90%')
          .margin(20)
          .onClick(() => {

            relationalStore.getRdbStore(getContext(this), STORE_CONFIG, function (err, rdbStore) {
              store = rdbStore;
              if (err) {
                console.error(`Get RdbStore failed, err: ${err}`);
                return;
              }
              console.info(`Get RdbStore successfully.`);
              this.executeSql("CREATE TABLE table_name(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50),age INT)");
            });



          })
        Button('新建', { type: ButtonType.Capsule, stateEffect: true })
          .width('90%')
          .margin(20)
          .onClick(() => {
            let diaryD={
              title: this.diaryTitle,
              content: this.diaryContent
            }

            this.timetable.push(diaryD)





            store.insert('EMPLOYEE',valueBucket,function(err,val){
              if(err)console.info('bad')

              console.info('good')

            })

          })

        List({ space: 20 }) {
          ForEach(this.timetable, (item) => {
            ListItemGroup({ header: this.itemHead(item.title), footer: this.itemFoot(1) }) {
              ListItem() {
                Text(item.content)
                  .width("100%")
                  .height(25)
                  .fontSize(20)
                  .textAlign(TextAlign.Center)
                  .backgroundColor(0xFFFFFF)
              }
            }
            .borderRadius(20)
            .divider({ strokeWidth: 1, color: Color.Blue }) // 每行之间的分界线
          })
        }
        .width('70%')
        .height('70%')
        .sticky(StickyStyle.Header | StickyStyle.Footer)
        .border({ width: 3, color: Color.Black })
        .alignListItem(this.alignListItem)
      }
      .height('100%')
    }
  }
}
