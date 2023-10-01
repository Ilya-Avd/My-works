function get_params_for_binance() {
    return {
      "asset": "USDT",
      "fiat": "RUB",
      "merchantCheck": false,
      "page": 1,
      "payTypes": ["YandexMoneyNew"],
      "publisherType": null,
      "rows": 20,
      "tradeType": "BUY"
    }
  }
  
  function get_request_binance_send_api(params) {
    return {
      "url": "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      },
      "payload": JSON.stringify(params)
    }
  }
  
  function binance_send_api(params) {
    let req = get_request_binance_send_api(params)
    return JSON.parse(UrlFetchApp.fetch(params.url, params).getContentText())
  }
  
  /**
   * Возвращает мониторинг определенной валюты и определенной крипты для определенного банка
   * @param {Валюта} fiat Здесь вы должны указать какой валютой вы оплачиваете, например RUB, USD, EUR
   * @param {Банк} bank Здесь вы указываете каким конкретно банком вы будете оплачивать
   * @param {Крипта} asset Здесь вы должны указать какую крипту вы хотите купить, например USDT, BTC, BUSD
   * @param {Количество записей} count Здесь вы указываете сколько записей использовать для расчета среднего арифметического по умолчанию 3
   * @returns Возвращает 2 строки, первая значение среднее по покупке и вторая средняя по продаже
   * @customfunction
   */
  function get_data_binance(fiat, bank, asset, count=3) {
    let params = get_params_for_binance()
    params.payTypes = [bank]
    params.fiat = fiat
    params.asset = asset
    params.rows = count
    let reqs = [
      "BUY", "SELL"
    ].map(
      tradetype => ({
        ...params,
        "tradeType": tradetype
      })
    ).map(
      prms => get_request_binance_send_api(prms)
    )
    var results = UrlFetchApp.fetchAll(reqs).map(
      (resp, i) => {
        var jsn = JSON.parse(resp.getContentText())
        if (jsn.total == 0) {
          return ["Ничего нет"]
        } else {
          return parseFloat((jsn.data.map(
            trade => parseFloat(trade.adv.price)
          ).reduce((prev, acc) => prev + acc) / Math.min(count, jsn.total)).toFixed(2))
        }
      }
    )
    return results
  }
  /**
   * @customfunction
   */
  function get_data_exludive(data, current_column, excludeind) {
    if (current_column >= excludeind) current_column++;
    return data[0][current_column]
  }
  
  function refreshData() {
    let sheetfile = SpreadsheetApp.getActiveSpreadsheet()
    sheetfile.getSheets().forEach(sheet => {
      let range = sheet.getDataRange()
      range.getFormulas().forEach((row, rowi) => {
        row.forEach((cell, celli) => {
          if (cell && cell.startsWith("=get_data_binance")) {
            var replacenum = "4";
            if (cell.slice(-2)[0] === "4") replacenum = "3"
            sheet.getRange(range.getRow() + rowi, range.getColumn() + celli).setFormula(cell.slice(0, -2) + replacenum + cell.slice(-1))
          }
        })
      })
    })
  }
  
  function onOpen() {
    let ui = SpreadsheetApp.getUi()
    ui.createMenu("Бинанс")
      .addItem("Обновить данные", "refreshData")
      .addToUi()
  }
  
  function onTime() {
    refreshData()
  }
  
  function doGet(req) {
    return "Hello world";
  }
  // get_data_binance("RUB", "YandexMoneyNew", "USDT", 3)
  // get_data_exludive([1, 2, 3], 0, 1)
  