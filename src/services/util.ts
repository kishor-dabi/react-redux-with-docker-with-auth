import moment from 'moment';
// import { NotificationBarConfig } from "../context/notificationContext";
export function parseSearchParams(searchParams: URLSearchParams, key: string): any {
    let params = {}
    try {
        params = JSON.parse(decodeURIComponent(searchParams.get(key) ?? '{}'))
    } catch (error) {
        console.warn(`Invalid URL search params : `, searchParams.get(key))
    }
    return params;
}

export function validateImageDimensions(blob: any, x: number, y: number): Promise<any> {
    return new Promise((resolve) => {
        if (blob) {
            let url = blob instanceof File ? URL.createObjectURL(blob) : blob
            let image = new Image()
            if (url) image.src = url;
            image.onload = () => {
                if (image.width / x === image.height / y) return resolve(true)
                return resolve(false)
            }
            image.onerror = () => {
                return resolve(false)
            }
        }
        else {
            resolve(true)
        }
    })
}

export function validateImageResolution(blob: any, x: number, y: number): Promise<any> {
    return new Promise((resolve) => {
        if (blob) {

            let url = blob instanceof File ? URL.createObjectURL(blob) : blob
            let image = new Image()
            if (url) image.src = url;
            image.onload = () => {
                if (image.width === x && image.height === y) return resolve(true)
                return resolve(false)
            }
            image.onerror = () => {
                return resolve(false)
            }
        }
        else {
            resolve(true)
        }
    })
}

export function getMediaTypeList() {
    return [
        { display: 'Audio', value: 'audio' },
        { display: 'Movie', value: 'movie' },
        { display: 'Series', value: 'series' },
        { display: 'Episode', value: 'episode' },
        { display: 'Game', value: 'game' },
        { display: 'Virtual Asset', value: 'virtualAsset' },
    ]
}

export function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function unSlugify(str: string, intoTitleCase = false) {
    return str.split('-')?.map(arg => intoTitleCase ? toTitleCase(arg) : arg)?.join(' ')
}

export function getKey(key: any, obj: any) {
    let val = key.split('.').reduce(function (a: any, b: any) {
        return a && a[b];
    }, obj);
    return val
}

export function getTimeRelativeTime(time: any) {
    return time ? moment(time).calendar(null, {
        sameDay: '[Today] h:mm:ss A'
    }) : ''
}

export function getUpdatedSearchParams(oldValues: any, newValues: any, name: string) {
    let updated = oldValues
    if (name === 'sort') {
        if (newValues['sort']) {
            updated['sort'] = newValues['sort']
        }
        else {
            delete updated['sort']
        }
    }
    if (name === 'pagination') {
        if (newValues['pagination']) {
            updated['pagination'] = newValues['pagination']
        }
        else {
            delete updated['pagination']
        }
    }
    if (name === 'search') {
        newValues['search'] ? updated['search'] = newValues['search']?.trim() : delete updated['search']
    }
    if (name === 'fields') {
        if (newValues['fields'] && newValues['fields']?.length) {
            updated['fields'] = newValues['fields'].filter((field:any) => field.value !== "")
        }
        else {
            delete updated['fields']
        }
    }
    return updated
}

export function AppendJsonToFormData(json: any, formDataInstance: FormData, rootKey?: any) {
    for (let key in json) {
        if (json[key] !== null && json[key] !== undefined) {
            if (json[key] instanceof File) {
                formDataInstance.append(`${rootKey ? `${rootKey}[${key}]` : key}`, json[key])
            }
            else if (json[key] instanceof FileList) {
                let fileIndex = 0
                for (let file of json[key]) {
                    formDataInstance.append(`${rootKey ? `${rootKey}[${key}]` : key}[${fileIndex}]`, file)
                    fileIndex += 1
                }
            }
            else if (typeof json[key] === 'object') {
                formDataInstance = AppendJsonToFormData(json[key], formDataInstance, `${rootKey ? `${rootKey}[${key}]` : key}`)
            }
            else {
                formDataInstance.append(`${rootKey ? `${rootKey}[${key}]` : key}`, json[key]?.toString())
            }
        }
    }
    return formDataInstance;
}

export function getErrorResponse(error: any) {
    // let errorObj: NotificationBarConfig = {
    //     title: error?.response?.data?.title ?? error?.response?.data?.error ?? error?.statusText,
    //     message: error?.response?.data?.message ?? error?.response?.data?.error ?? error?.message,
    //     type: 'error'
    // }

    if (error?.response?.status === 403) {
        // errorObj['title'] = 'Permission denied !'
        // errorObj['message'] = 'You are not allowed to do this operation, please contact super admin.'
    }

    // return errorObj;
}

export function getKeyByValue(object:any, value:any) {
    return Object.keys(object).find(key => object[key] === value);
}

export async function sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}