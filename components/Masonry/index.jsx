import { memo, useMemo } from "react"

const divideArray = (array, length) => {
    const newArray = [...array]
    const divideRes = Math.floor(newArray.length/length)
    let results = []

    for (let i = 0; i < length; i++) {    
        results.push(newArray.splice(0, divideRes))
    }

    for (let i = 0; i < newArray.length; i++) {
        results[i].push(newArray[i])
    }

    results = results.filter(itm => itm.length)

    return results
}

const masonryContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const masonryColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

const Masonry = ({ dataArray, columnCount, ChildsElement }) => {
    return useMemo(() => {
        const arr = divideArray(dataArray, columnCount)

        return (
            <div style={masonryContainerStyle}>
                {
                    arr?.map((itm, i) => (
                        <div key={i} style={masonryColumnStyle}>
                            {
                                itm?.map((elm, i) => <ChildsElement value={elm} key={elm?.id ?? i} />)
                            }
                        </div>
                    ))
                }
            </div>
        )
    }, [dataArray, columnCount])
}

export default memo(Masonry)