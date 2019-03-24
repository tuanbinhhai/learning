class NewsController < ApplicationController
  require 'open-uri'
  BASE_URL = 'https://www.danhgiaxe.com/'.freeze
  LIST_URL = 'https://www.danhgiaxe.com/danh-gia-pg'.freeze

  def crawl_article
    results = []
    elements = []
    url = LIST_URL + params[:pages].to_s
    page = Nokogiri::HTML(open(url))
    doc = page.css('.ul-flex')
    elements += doc.css('li')
    elements.each do |e|
      element = {}
      element[:title] = e.css('.title-16').text
      element[:image] = e.css('img').first['src']
      element[:url] = BASE_URL + e.css('.title-16').css('a').first['href']

      results.append(element)
    end

    render json: results, status: 200
  end
end
