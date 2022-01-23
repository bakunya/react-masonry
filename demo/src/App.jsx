import { useState, memo, useCallback, useEffect } from 'react'
import Masonry from '@bakunya/react-masonry'

const TextElement = memo(({ value }) => (
  <div style={{ padding: '5px', borderRadius: '10px', margin: '5px', background: 'black', color: 'white' }}>
      <p style={{ textAlign: 'center' }}>{value}</p>
  </div>
))

const ImageElement = memo(({ value }) => (
  <div style={{ borderRadius: '10px', margin: '5px' }}>
      <img src={value} style={{ width: '100%', borderRadius: '10px' }} />
  </div>
))

const initialTexts = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sit corporis. Ut maxime voluptates asperiores incidunt, laudantium dicta magnam, eligendi assumenda inventore accusantium corrupti dolorum, officia reiciendis temporibus dolor corporis!",
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Est et, vel explicabo labore quibusdam ipsam molestias error facilis rem obcaecati quos quo beatae, corporis accusamus dolorem totam eligendi adipisci quas?
  Magni iure vel quam? Enim eius corrupti dolores, temporibus officia optio magnam exercitationem quas repudiandae voluptas consequatur eligendi! Vitae eligendi impedit sed hic adipisci voluptate, ab veritatis illum tempora quaerat.`,
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, obcaecati nesciunt. Esse, culpa nesciunt doloremque sequi placeat vero pariatur aspernatur?",
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum odio doloremque, autem voluptate cumque hic sed fuga. Iste, possimus non. Aliquid voluptas fuga praesentium quasi. Illum perferendis quod earum aperiam!
  Id temporibus numquam reiciendis sapiente, in ipsam libero quo perspiciatis! Tempora earum tenetur enim laborum minus amet perspiciatis omnis eius magnam ex. Cumque, doloremque fugiat id dolore similique omnis quam.
  Fugiat expedita temporibus consectetur fuga doloremque necessitatibus veritatis laboriosam quos quas maiores optio voluptas corrupti dicta unde inventore eaque eius corporis tempora, quaerat mollitia ad ratione ut maxime earum. Necessitatibus?`,
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia suscipit eligendi sit laboriosam rerum vero. Consequuntur aperiam iste minima explicabo magni tenetur placeat quod facere exercitationem, aspernatur quibusdam voluptatem animi!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, cumque.",
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, voluptas aut dolorem accusantium aspernatur consectetur sequi porro explicabo, perspiciatis aliquam nesciunt neque est saepe minima suscipit, distinctio in molestiae impedit.
  Impedit id vitae laborum nemo iste numquam, voluptatum doloribus beatae modi vero similique repellat consequatur, voluptatibus fugit temporibus accusamus ad est animi distinctio cumque explicabo possimus! Voluptatem minima adipisci assumenda!`,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, aperiam similique quidem ut ratione itaque dignissimos, sed labore nulla ullam blanditiis iure dolores ipsum sint quis, asperiores expedita distinctio praesentium? Officia amet molestiae voluptate at laborum veritatis nihil corrupti dolor?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugit ut rerum exercitationem? Eum voluptate saepe, nihil non natus in debitis vitae magni atque quaerat dolorum quos tempore laudantium eveniet.",
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae labore obcaecati ipsam numquam eligendi a iste porro, quis blanditiis reiciendis. Voluptatibus veniam numquam a dolor quasi, recusandae temporibus! Rem, dolor.
  Sint quis vel, ex eaque aperiam eum inventore? Distinctio sed autem ea temporibus cupiditate laboriosam esse sunt minus exercitationem. Autem, explicabo omnis amet alias distinctio velit quisquam obcaecati provident ratione!
  Eligendi delectus aliquid sit perferendis deleniti culpa numquam possimus non. Deserunt, ab quod. Suscipit impedit atque ipsam dolores? Est in maiores possimus neque consequatur alias debitis deleniti veniam fugit voluptatum?
  Sed mollitia perspiciatis cumque dignissimos iusto voluptatum, porro consectetur fugit molestiae nesciunt at nostrum reprehenderit nam, quo dolor in numquam magnam aliquam! Ad quam illo animi rerum id autem magni!
  Expedita incidunt quisquam, doloribus voluptate aliquam repudiandae enim possimus officia quae ipsum sit porro fugit alias vitae, a illo esse, reiciendis temporibus omnis ipsam quis! Totam facilis laudantium deleniti. Possimus!`,
  `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit sed velit exercitationem. Perferendis reprehenderit quia, sequi vel vero voluptas fuga ab voluptatem placeat voluptatum numquam corporis debitis eos dignissimos doloremque.
  Culpa eveniet qui excepturi accusantium expedita, nulla temporibus soluta repudiandae ex rerum distinctio dolor suscipit obcaecati molestiae est reiciendis ab? Sunt quod nisi accusantium distinctio quisquam tempora dolor consectetur minus.`,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, aperiam similique quidem ut ratione itaque dignissimos, sed labore nulla ullam blanditiis iure dolores ipsum sint quis, asperiores expedita distinctio praesentium? Officia amet molestiae voluptate at laborum veritatis nihil corrupti dolor?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugit ut rerum exercitationem? Eum voluptate saepe, nihil non natus in debitis vitae magni atque quaerat dolorum quos tempore laudantium eveniet.",
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum odio doloremque, autem voluptate cumque hic sed fuga. Iste, possimus non. Aliquid voluptas fuga praesentium quasi. Illum perferendis quod earum aperiam!
  Id temporibus numquam reiciendis sapiente, in ipsam libero quo perspiciatis! Tempora earum tenetur enim laborum minus amet perspiciatis omnis eius magnam ex. Cumque, doloremque fugiat id dolore similique omnis quam.
  Fugiat expedita temporibus consectetur fuga doloremque necessitatibus veritatis laboriosam quos quas maiores optio voluptas corrupti dicta unde inventore eaque eius corporis tempora, quaerat mollitia ad ratione ut maxime earum. Necessitatibus?`,
]
const initialImages = [
  "https://images.unsplash.com/photo-1533003505519-6a9b92ed4911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTE4MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1504883303951-581cbf120aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIyOTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1517328894681-0f5dfabd463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMDU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1578783951217-ca527085dc12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMjI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1484249170766-998fa6efe3c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMzA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1496588668219-5f0a1a3e230a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1478039414627-50a2aee2e122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzNDQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1561503972-839d0c56de17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzNTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1534396101185-3f9ed177c193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzNjM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1533056903395-a36fb8a4ac8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzODE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1475066392170-59d55d96fe51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzODg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
]

const App = () => {
  const [texts, setTexts] = useState(initialTexts)
  const [images, setImages] = useState(initialImages)

  const handleTexts = useCallback(() => setTexts(prev => [...prev, ...initialTexts]), [setTexts])
  const handleImages = useCallback(() => setImages(prev => [...prev, ...initialImages]), [setImages])

  const settingColumns = useCallback(() => {
    if(window.innerWidth >= 1400) return 4
    if(window.innerWidth >= 800) return 3
    if(window.innerWidth >= 500) return 2
    return 1
  }, [])
  const [column, setColumn] = useState(() => settingColumns())


  useEffect(() => {
    window.addEventListener('resize', () => setColumn(() => settingColumns()))

    return window.removeEventListener('resize', () => setColumn(() => settingColumns()))
  }, [setColumn, settingColumns])

  return (
    <div className="App">
      <div style={{ padding: '5px' }}>
        <h1 style={{ textAlign: 'center', margin: '20px 0px 40px 0px' }}>Text Examples</h1>
        <Masonry
          dataArray={texts}
          columnCount={column}
          ChildsElement={TextElement}
        />
      </div>
      <button onClick={handleTexts} style={{ cursor: 'pointer', padding: '20px', display: 'block', margin: '30px auto' }}>Load More Text</button>
      <div style={{ padding: '5px', margin: '300px 0px 0px 0px' }}>
        <h1 style={{ textAlign: 'center', margin: '10px 0px 40px 0px' }}>Images Examples</h1>
        <Masonry
          dataArray={images}
          columnCount={column}
          ChildsElement={ImageElement}
        />
      </div>
      <button onClick={handleImages} style={{ cursor: 'pointer', padding: '20px', display: 'block', margin: '30px auto 80px auto' }}>Load More Image</button>
    </div>
  )
}

export default memo(App)