export const bdrcManifest = `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG10720_I1PD153371/manifest`
export const princetonManifest = `https://figgy.princeton.edu/concern/scanned_resources/6c73166e-254c-4f3d-a176-8583c63ff9da/manifest`
export const nomadCollection = `https://nomad-project.co.uk/objects/collection/index.json`
export const nomadManifest = `https://nomad-project.co.uk/objects/collection/gold-broach/index.json`


const bdrcRoot = `http://presentation.bdrc.io/2.1.1/`

export const bdrc = [
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1KG1132`,
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1KG10720`,
    `http://presentation.bdrc.io/2.1.1/collection/i:bdr:I1GS135873`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG5200_I1KG5250/manifest`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V22677_I1KG1714/manifest`,
    `http://presentation.bdrc.io/2.1.1/v:bdr:V1KG1279_I1KG1288/manifest`
]

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}