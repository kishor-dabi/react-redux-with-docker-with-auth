export const reformatKalturaMediaResponse = (input_data: any) => {
    let data: any = {}
    data['name'] = input_data?.mediaData?.name
    data['description'] = input_data?.mediaData?.description
    data['age_rating_description'] = input_data?.age_rating_description
    data['age_rating'] = input_data?.age_rating
    data['selectedPartner'] = input_data?.allowed_partner ? input_data?.allowed_partner?.split(',') : []
    data['order'] = input_data?.order_by
    data['seo_title'] = input_data?.seo_title
    data['seo_description'] = input_data?.seo_description
    data['entry_id'] = input_data?.mediaData?.id
    data['media_id'] = input_data?.id ?? input_data?.media_id

    data['profileName'] = "DEFAULT" // Hardcoded in OLD CMS 

    data['_dataUrls'] = {
        'image_16_9': input_data?.mediaData?.thumbnailUrl,
        'image_4_3': input_data?.metadata?.DEFAULT?.STRINGPicUrl2,
        'image_2_3': input_data?.metadata?.DEFAULT?.STRINGPicUrl3,
        'image_1_1': input_data?.metadata?.DEFAULT?.STRINGPicUrl4,
    }

    data['metadata'] = input_data?.['metadata']?.DEFAULT

    return data;
}

export const reformatSeriesResponse = (input_data: any) => {
    let data: any = {}

    data['mediaId'] = '' //Get it from front-end
    data['thumb_16_9_src'] = input_data?.mediaContent?.thumb_16_9_src
    data['thumb_4_3_src'] = input_data?.mediaContent?.thumb_4_3_src
    data['thumb_1_1_src'] = input_data?.mediaContent?.thumb_1_1_src
    
    data['seriesName'] = input_data?.mediaContent?.seriesName
    data['description'] = input_data?.mediaContent?.description
    data['entryId'] = input_data?.mediaContent?.entryId

    data['mediaTypeString'] = "TV Series"  // todo: Add constant from front-end

    data['mediaType'] = input_data?.mediaContent?.MediaType
    data['watchPermissionRule'] = input_data?.mediaContent?.WatchPermissionRule
    data['geoBlockRule'] = input_data?.mediaContent?.GEOBlockRule
    data['language'] = input_data?.mediaContent?.STRINGLanguage
    data['censor'] = input_data?.mediaContent?.STRINGCensor
    data['seriesShortTitle'] = input_data?.mediaContent?.STRINGSeriesShortTitle
    data['seriesSecondaryTitle'] = input_data?.mediaContent?.STRINGSeriesSecondaryTitle
    data['seriesMainTitle'] = input_data?.mediaContent?.STRINGSeriesMainTitle
    data['sbu'] = input_data?.mediaContent?.STRINGSBU
    data['season'] = input_data?.mediaContent?.NUMSeason
    data['yearofRelease'] = input_data?.mediaContent?.NUMYearofRelease
    data['onAir'] = input_data?.mediaContent?.BOOLOnAir?.toString()
    data['isactive'] = input_data?.mediaContent?.STRINGISACTIVE
    data['keywords'] = input_data?.mediaContent?.OTTTAGKeywords
    data['order'] = input_data?.order_by
    data['genre'] = input_data?.mediaContent?.OTTTAGGenre
    data['contributorList'] = input_data?.mediaContent?.OTTTAGContributorList
    data['awardList'] = input_data?.mediaContent?.OTTTAGAwardList
    data['seriesSynopsis'] = input_data?.mediaContent?.STRINGSeriesSynopsis
    data['age_rating_description'] = input_data?.age_rating_description
    data['audioDefaultLanguage'] = input_data?.mediaContent?.STRINGAudioDefaultLanguage
    data['mediaExternalId'] = input_data?.mediaContent?.OTTTAGMediaExternalId
    data['age'] = input_data?.mediaContent?.OTTTAGAge
    data['age_rating'] = input_data?.age_rating
    data['minAge'] = input_data?.mediaContent?.NUMMinAge
    data['maxAge'] = input_data?.mediaContent?.NUMMaxAge
    data['seo_title'] = input_data?.seo_title
    data['seo_description'] = input_data?.seo_description
    data['OTTTAGAssetMarketType'] = input_data?.mediaContent?.OTTTAGAssetMarketType


    data['_dataUrls'] = {
        'thumb_16_9': input_data?.mediaContent?.thumb_16_9_src,
        'thumb_4_3': input_data?.mediaContent?.STRINGPicUrl2,
        'thumb_1_1': input_data?.mediaContent?.thumb_1_1_src,
    }

    return data;
}

export const reformatEbookResponse = (input_data: any) => {
    let data:any = {}

    data['id'] = input_data?.ebookDbData?.ebook_id
    data['contributorTypeId'] = input_data?.eBookData?.contributorTypeId
    data['coverImageSrc'] = input_data?.eBookData?.coverImageSrc
    data['bgImageSrc'] = input_data?.eBookData?.bgImageSrc
    data['name'] = input_data?.eBookData?.name
    data['code'] = input_data?.eBookData?.code
    data['description'] = input_data?.eBookData?.description
    data['active'] = input_data?.eBookData?.isActive ? 1 : 0
    data['sbu'] = input_data?.eBookData?.sbu
    data['refSeriesName'] = input_data?.eBookData?.refSeriesName
    data['contributorName'] = input_data?.eBookData?.contributorName
    data['genre'] = input_data?.eBookData?.genre
    data['language'] = input_data?.eBookData?.language
    data['age'] = input_data?.eBookData?.age
    data['readingLevel'] = input_data?.eBookData?.readingLevel
    data['narrator'] = input_data?.eBookData?.narrator
    data['content'] = input_data?.eBookData?.content
    data['character'] = input_data?.eBookData?.character
    data['keywords'] = input_data?.eBookData?.keywords
    data['awards'] = input_data?.eBookData?.awards
    data['skills'] = input_data?.eBookData?.skills
    data['subSkills'] = input_data?.eBookData?.subSkills
    data['themes'] = input_data?.eBookData?.themes
    data['subThemes'] = input_data?.eBookData?.subThemes
    data['publicationDate'] = input_data?.eBookData?.publicationDate
    data['publisher'] = input_data?.eBookData?.publisher
    data['abridged'] = input_data?.eBookData?.abridged
    data['pageCount'] = input_data?.eBookData?.pageCount
    data['minAge'] = input_data?.minAge
    data['age_rating_description'] = input_data?.ebookDbData?.age_rating_description
    data['age_rating'] = input_data?.ebookDbData?.age_rating
    data['is_premium'] = input_data?.ebookDbData?.is_premium?.toString()
    data['seo_title'] = input_data?.ebookDbData?.seo_title
    data['seo_description'] = input_data?.ebookDbData?.seo_description
    data['maxAge'] = input_data?.maxAge
    data['oldJSON'] = input_data?.eBookData
    data['_dataUrls'] = {
        'coverImage': input_data?.eBookData?.coverImageSrc,
        'bgImage': input_data?.eBookData?.bgImageSrc,
    }
    
    return data;
}


export const reformatTrayData = (input_data: any) => {
    let data:any = {}

    data['id'] = input_data?.id
    data['label'] = input_data?.label
    data['is_active'] = input_data?.is_active
    data['p_id'] = input_data?.p_id ? input_data?.p_id?.split(',') : []
    data['attachedVerticalIDs'] = input_data?.attachedVerticalIDs ?? []
    data['duplicate_limit'] = parseInt(input_data?.duplicate_limit) > 1 ? true : false

    let default_configuration: any = {}
    default_configuration['trayLayout'] = input_data?.default_configuration?.trayLayout
    default_configuration['trayContentType'] = input_data?.default_configuration?.trayContentType
    default_configuration['isImgRequired'] = input_data?.default_configuration?.isImgRequired ?? 1
    default_configuration['versions'] = input_data?.default_configuration?.versions?.[0]?.split(',') ?? []
    default_configuration['isNextPageAPI'] = input_data?.default_configuration?.isNextPageAPI ? true : false
    default_configuration['nextPageAPI'] = input_data?.default_configuration?.nextPageAPI
    default_configuration['paginationType'] = input_data?.default_configuration?.paginationType
    default_configuration['widgetCode'] = typeof input_data?.default_configuration?.widgetCode === 'object' ? input_data?.default_configuration?.widgetCode?.filter((wc:any)=>!!wc) : []
    default_configuration['isRelatedContentValue'] = parseInt(input_data?.default_configuration?.isRelatedContentValue) ? true : false
    
    const isRelatedContentValues = input_data?.default_configuration?.isRelatedContent?.mediaType;
    default_configuration['isRelatedContent'] = {
        mediaType: isRelatedContentValues ? isRelatedContentValues?.split('|') : []
    }
    default_configuration['isSegmentedTabs'] = input_data?.default_configuration?.isSegmentedTabs ? true : false
    default_configuration['segmentedTabs'] = input_data?.default_configuration?.segmentedTabs
    default_configuration['minValue'] = parseInt(input_data?.default_configuration?.minValue ?? 0)
    default_configuration['maxInlineValue'] = parseInt(input_data?.default_configuration?.maxInlineValue ?? 0)
    default_configuration['minSliderCount'] = parseInt(input_data?.default_configuration?.minSliderCount ?? 0)
    default_configuration['maxSliderCount'] = parseInt(input_data?.default_configuration?.maxSliderCount ?? 0)

    data['default_configuration'] = default_configuration;
    return data;

}

export const reformatInteractivityData = (input_data: any) => {
    
    let data:any = {}

    data['mediaId'] = input_data?.mediaId
    data['assetName'] = input_data?.assetName
    data['description'] = input_data?.description
    data['interactivityURL'] = input_data?.interactivityURL
    data['mediaType'] = input_data?.mediaType
    data['watchPermissionRule'] = input_data?.watchPermissionRule
    data['geoBlockRule'] = input_data?.geoBlockRule
    data['language'] = input_data?.language
    data['censor'] = input_data?.censor
    data['assetShortTitle'] = input_data?.assetShortTitle
    data['assetSecondaryTitle'] = input_data?.assetSecondaryTitle
    data['assetMainTitle'] = input_data?.assetMainTitle
    data['sbu'] = input_data?.sbu
    data['season'] = input_data?.season ?? 0
    data['yearofRelease'] = input_data?.yearofRelease
    data['onAir'] = input_data?.onAir ?? 'False'
    data['isactive'] = input_data?.isactive === "True" ? true : false
    data['keywords'] = input_data?.keywords
    data['genre'] = input_data?.genre
    data['contributorList'] = input_data?.contributorList
    data['awardList'] = input_data?.awardList
    data['assetSynopsis'] = input_data?.assetSynopsis
    data['audioDefaultLanguage'] = input_data?.audioDefaultLanguage
    data['seriesTitle'] = input_data?.seriesTitle
    data['age_rating'] = input_data?.age_rating
    data['age_rating_description'] = input_data?.age_rating_description
    data['order_by'] = input_data?.order_by ?? 9999
    data['assetMarketType'] = input_data?.assetMarketType
    data['orientation'] = input_data?.orientation ?? 'portrait'
    data['isNewTab'] = input_data?.isNewTab?.toString() ?? '0'
    data['thumb_16_9_src'] = input_data?.thumb_16_9_src
    data['_dataUrls'] = {
        'thumb_16_9': input_data?.thumb_16_9_src
    }

    return data;

}

export const reformatGameData = (input_data: any) => {
    let data:any = {}

    data['mediaId'] = input_data?.mediaId
    data['thumb_16_9_src'] = input_data?.thumb_16_9_src
    data['assetName'] = input_data?.assetName
    data['description'] = input_data?.description
    data['gameLink'] = input_data?.game_link
    data['assetMainTitle'] = input_data?.assetMainTitle   
    data['mediaType'] = input_data?.mediaType //Todo: Get constant value from backend
    data['language'] = input_data?.language
    data['season'] = input_data?.season
    data['yearofRelease'] = input_data?.yearofRelease
    data['keywords'] = input_data?.keywords
    data['sbu'] = input_data?.sbu
    data['genre'] = input_data?.genre
    data['ref_series_title'] = input_data?.ref_series_title
    data['age_rating'] = input_data?.age_rating
    data['age_rating_description'] = input_data?.age_rating_description
    data['order_by'] = input_data?.order_by
    data['isactive'] = !!input_data?.isactive
    data['orientation'] = input_data?.orientation
    data['assetMarketType'] = input_data?.is_premium?.toString()
    
    data['_dataUrls'] = {
        thumb_16_9: input_data?.thumb_16_9_src
    }
    
    return data;
}

export const TransformCommonSearchData = (data: any []) => {
    const transformed_data = data?.map(object => {
        const new_object = {...object};
        new_object['title'] = new_object?.movie_main_title ?? new_object?.audio_main_title ?? new_object?.media_main_title ?? new_object?.series_main_title ?? new_object?.name 
        new_object['image'] = new_object?.movie_image ?? new_object?.audio_image ?? new_object?.image ?? new_object?.cover_image ?? new_object?.media_Data?.products?.previewPath ?? new_object?.kids_character_image 
        new_object['media_type'] = parseInt(new_object?.media_type) ?? parseInt(new_object?.media_Data?.type)
        new_object['entry_id'] = new_object?.entry_id ? new_object?.entry_id : new_object?.media_Data?.extra_params?.entry_id
        new_object['id'] =  new_object?.id ?? new_object?.media_id ?? new_object?.media_Data?.id ?? new_object?.ebook_id
        new_object['language'] = new_object?.language ?? new_object?.media_Data?.products?.language
        return new_object;
    })
    return transformed_data;
}