const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day7', '\n$ ')

const handleLS = (contents, path, files) => {
    contents.shift()
    for (let i = 0; i < contents.length; i++) {
        let elems = contents[i].split(' ')
        if (elems[0] === 'dir') {
            let newPath = (path === '/') ? path + elems[1] : path + '/' + elems[1]
            files[path].children.push(newPath)
            files[newPath] = {parent: path, size: 0, children: []}
        } else {
            files[path].size += Number(elems[0])
        }
    }
    return files
}

const handleCD = (path, target) => {
    if (target === '/') {
        return '/'
    } else if (target === '..') {
        let paths = path.split('/')
        return paths.slice(0, paths.length - 1).join('/');
    } else {
        return (path === '/') ? path + target : path + '/' + target
    }
}

const buildFiles = input => {
    let files = {'/': {parent: null, size: 0, children: []}}
    let path = '/'
    for (let i = 1; i < input.length; i++) {
        if (input[i].split(' ')[0] === 'cd') {
            path = handleCD(path, input[i].split(' ')[1])
        } else {
            files = handleLS(input[i].split('\n'), path, files)
        }
    }

    const calculateSize = dir => {
        return files[dir].size + files[dir].children.reduce((acc, child) => acc + calculateSize(child), 0)
    }

    let mustClear = 30000000 - (70000000 - calculateSize('/'))
    let deleteOptions = []

    const totalSizes = Object.keys(files).reduce((acc, dir) => {
        let size = calculateSize(dir)
        if (size > mustClear) {
            deleteOptions.push(size)
        }
        acc = (size <= 100000) ? acc += size : acc
        return acc
    }, 0)
    console.log('part 1 solution:', totalSizes)
    console.log('part 2 solution:', deleteOptions.sort((a, b) => a - b)[0])

}

buildFiles(input)