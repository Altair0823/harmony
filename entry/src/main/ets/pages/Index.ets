//@param context
import preferences from '@ohos.data.preferences'
import router from '@ohos.router'
import buffer from '@ohos.buffer'

@Entry
@Component
struct MainPage {
  @State message: string = '欢迎登陆'
  @State password:string=''
  Context:Context

  build() {
    Row() {
      Column() {

        //
        Image($r("app.media.Altair_1"))
          .width(100)
          .height(100)
          .margin({ bottom: '20vp' })

        //
        TextInput({ placeholder: '密码' })
          .type(InputType.Password)
          .placeholderColor(0x999999)
          .maxLength(8)
          .padding(12)
          .margin(10)
          .onChange(data => {
            this.password = data;
            console.info(this.password)
          })

        Button('确定', { type: ButtonType.Capsule, stateEffect: true })
          .width('90%')
          .margin(20)
          .onClick(() => {
            let password=this.password
            preferences.getPreferences(getContext(this), 'password')
              .then((preferences) => {

                preferences.has('password', (err, val) => {
                  if (val) {
                    preferences.get('password','default').then((value)=>
                    {
                      console.info(value+password)

                      if(password.length!=value.toString().length) {
                        return
                      }

                      for(let i=0;i<=password.length-1;i++){
                        if(password[i]!=value[i])return
                      }



                        router.pushUrl({


                          url: 'pages/MainPage'

                        })

                      console.info('读取'+value)
                      router.pushUrl({url:"pages/MainPage",params:{"password":this.password}})
                    }

                    )
                    preferences.flush()
                    return
                  }

                  if(err) {
                    preferences.put('password', password, (val) => {
                      if (val) {
                        console.info('写入' + password)
                      }
                    })
                    preferences.flush()
                    return
                  }

                  else {
                    if (err) {
                    }
                    preferences.put('password', password, (err) => {
                      if (err) {
                        console.info("Failed to put value of 'password'. code =" + err.code + ", message =" + err.message)
                      } else {
                        console.info("Succeeded in putting value of 'password'.")
                      }
                    })
                  }

                  console.info('初始化' + password)
                  preferences.flush()
                  return
                })
              })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
