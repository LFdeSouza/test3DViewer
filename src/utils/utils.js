export function formatName(string) {
    let name = string
    if (string.includes("/")) {
        name = string.split("/").splice(1).join('')
    }

    return name.split('.')[0]
}

export function getColor(name) {
    name = name.toUpperCase()

    return name.includes('AORTA') ? '#CC3300' :
        name.includes('IVC') ? "#92a1ff" :
            name.includes('ARTERIA') || name.includes('ARTERY') ? "#FF0000" :
                name.includes('CVI') ? "#6478FA" :
                    name.includes('VEIA') || name.includes('VEIN') ? "#6472fa" :
                        name.includes('PORTA') || name.includes('PORTAL') ? "#FA87F5" :
                            name.includes('OSSO') ? "#C9C9C9" :
                                name.includes('CALCIO') ? "#FFFFFF" :
                                    name.includes('METAL1') ? "#1E43AA" :
                                        name.includes('METAL2') ? "#0A64FF" :
                                            name.includes('TUMOR') || name.includes('HIGH TUMOR') ? "#862e9c" :
                                                name.includes('CISTO') ? "#538135" :
                                                    name.includes('TRAQUEIA') ? "#538135" :
                                                        name.includes('COLON') ? "#F7CAAC" :
                                                            name.includes('INTESTINO') ? "#FFE599" :
                                                                name.includes('TROMBO') ? "#1F4E79" :
                                                                    name.includes('RIM') ? "#FF9999" :
                                                                        name.includes('FIGADO') || name.includes('LIVER') ? "#ffa07a" :
                                                                            name.includes('ESOFAGO') ? "#F4B083" :
                                                                                name.includes('ORGAO1') ? "#CC3300" :
                                                                                    name.includes('ORGAO2') ? "#00CC00" :
                                                                                        name.includes('TECIDO1') ? "#BF8F00" :
                                                                                            name.includes('PV1') || name.includes('LID') ? "#71FAFA" :
                                                                                                name.includes('PV2') || name.includes('LM') ? "#A663FA" :
                                                                                                    name.includes('PV3') || name.includes('LSD S1') ? "#CEFFB7" :
                                                                                                        name.includes('PV4') || name.includes('toraxLSD S2') ? "#FA7FAD" :
                                                                                                            name.includes('PV5') || name.includes('toraxLSD S3') ? "#F3FF6D" :
                                                                                                                name.includes('PV6') ? "#F3FF6D" :
                                                                                                                    name.includes('PV7') ? "#71FAFA" :
                                                                                                                        name.includes('BRONQUIO') ? "#DFBE7B" :
                                                                                                                            randomColor()

}

function randomColor() {
    const colors = ["#6EFFB7",
        "#A46DCe",
        "#CEFFB7",
        "#FA9DDF",
        "#FF5733",
        "#F3FF6D",
        "#71FAFA",
    ]
    const random = Math.floor(Math.random() * 6)
    return colors[random]
}

