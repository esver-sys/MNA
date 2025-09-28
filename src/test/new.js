
	query Query($queryBuilderMetaId: ID!) {
  queryBuilderMeta(id: $queryBuilderMetaId) {
    name
    id
    shop
    pagePath
    product {
      ID
      title
      price
      categories
      sale_price
      regular_price
      min_price
      image
      slug
      public_url
      feature_image {
        ID
        thumbnail
        media_content_type
        url
      }
      variants {
        ID
        post_title
        title
        price
        sale_price
        regular_price
        image
        buy_able
        post_parent
        feature_image {
          ID
          url
          thumbnail
          media_content_type
        }
        attrs {
          name
          value
        }
        sku
      }
      gallery {
        ID
        url
        thumbnail
        media_content_type
      }
      variant_attrs {
        value
        name
        position
      }
    }
    setting {
      packageNum
      packages {
        index
        quantity
        image
        recommend_sale
      }
    }
    shipping_insurance_enable
    shipping_insurance_rate
    store_id
    seoTitle
    seoDescription
    countryCustomsRules {
      id
      country
      name
      is_required
      status
      sort_number
      country_en
      country_code
    }
    shippingZonesCounties {
      code
      name
      states {
        code
        name
      }
    }
  }
}
	v1.42.1-rc.1	2025-08-20 09:15:12	2025-08-20 09:15:12