export const interPolateString = (str: string, page: string) => {
    return str.replace("#{page}", page)
}