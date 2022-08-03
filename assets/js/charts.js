var converters = {
    // Latin to Farsi
    fa: function (number) {
        return number.toString().replace(/\d/g, function (d) {
            return String.fromCharCode(d.charCodeAt(0) + 1728);
        });
    },
};
var highchartsOptions = Highcharts.setOptions({
        time: {
            timezone: 'Asia/Tehran',
            useUTC: false,
            formatter: function () {
            }
        },
        lang: {
            months: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            shortMonths: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            weekdays: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"],
            rangeSelectorFrom: "از",
            rangeSelectorTo: "تا",
            rangeSelectorZoom: "بازه",
            downloadPNG: 'png دانلود به صورت ',
            downloadJPEG: 'jpeg دانلود به صورت ',
            downloadPDF: 'pdf دانلود به صورت   ',
            downloadSVG: 'svg دانلود به صورت ',
            downloadCSV: 'csv دانلود فایل ',
            downloadXLS: 'xls دانلود فایل ',
            printChart: "پرینت",

        }
    }
);
Highcharts.dateFormats = {
    'a': function (ts) {
        return new persianDate(ts).format('dddd')
    },
    'A': function (ts) {
        return new persianDate(ts).format('dddd')
    },
    'd': function (ts) {
        return new persianDate(ts).format('DD')
    },
    'e': function (ts) {
        return new persianDate(ts).format('D')
    },
    'b': function (ts) {
        return new persianDate(ts).format('MMMM')
    },
    'B': function (ts) {
        return new persianDate(ts).format('MMMM')
    },
    'm': function (ts) {
        return new persianDate(ts).format('MM')
    },
    'y': function (ts) {
        return new persianDate(ts).format('YY')
    },
    'Y': function (ts) {
        return new persianDate(ts).format('YYYY')
    },
    'W': function (ts) {
        return new persianDate(ts).format('ww')
    }
};

function get_country_data(type, all_data, category = ' ') {
    var ajax_url = "/country_data/" + type + '/' + category + '/';
    var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
    $.ajax({

        url: ajax_url,
        type: 'GET',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            'all_data': all_data,
        },
        success: function (jsondata) {
            var Mychart = $("#iran_chart").highcharts();
            Mychart.series[0].update({
                data: jsondata.country_drilldown
            }, true);
            Mychart.setTitle({text: category});
        }
    });
}

// Make monochrome colors
function chartColors(base, count, bright = 1.5) {
    var base_color = base;
    var colors = [base], i;

    for (i = 0; i < count; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color

        base_color = Highcharts.color(base_color).brighten(bright / (count)).get();
        colors.push(base_color);
    }
    return colors;
}

/**
 * area chart
 */

function get_area_chart(id, categories, data, ytext, color_fill, color_border) {

    Highcharts.chart(id, {
        chart: {
            type: 'areaspline',
            zoomType: 'x',
            borderRadius: 20,
            style: {
                fontFamily: 'Sahel'
            },
        },

        title: {
            text: ''
        },
        xAxis: {

            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%Y-%m-%d', this.value);
                }
            },
            categories: categories
        },
        credits: {
            enabled: false
        },
        yAxis: {

            title: {
                text: ytext,
                style: {
                    fontFamily: 'Sahel',
                    direction: 'rtl',

                }
            }
        },
        tooltip: {
            xDateFormat: '%Y-%m-%d',
            // },
            // pointFormat: '{point.y} ms',
            shared: true
        },
        plotOptions: {
            areaspline: {
                // fillColor: color_fill || 'rgba(40,167,69,.75)',
                fillColor: color_fill || 'rgba(46, 202, 154,.75)',
                marker: {enabled: false},
                lineWidth: 1,
                threshold: null
            },
            showInLegend: false
        },

        series: [{
            name: ytext,
            data: data,
            color: color_border || '#197a2e',
            showInLegend: false
        }]
    });

}

/**
 * bar chart
 */
function get_bar_chart(id, data, ytext, bar_count, color_list, color_hover, drilldown) {

// Create the chart
    Highcharts.chart(id, {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Sahel'
            },
            align: 'center',
            useUTC: true,
            events: {
                drilldown: function (e) {
                    if (window.location.pathname.includes('bot') || window.location.pathname == '/') {
                        get_country_data('bots', false, e.point.name);
                    }
                    var chart = this;
                    chart.setTitle({text: e.point.name});
                },
                drillup: function (e) {
                    if (window.location.href.includes('bot') || window.location.pathname == '/') {
                        get_country_data('bots', true);
                    }
                    var chart = this;
                    chart.setTitle({text: ''});
                }
            },
            borderRadius: 20
        },
        plotOptions: {
            series: {

                borderRadius: 5,
                states: {
                    hover: {
                        color: color_hover || '#17a2b8'
                    }
                }
            },
            column: {
                colorByPoint: true
            }
        },
        // colors: color_list || chartColors('#75777c', bar_count),
        colors: color_list || chartColors('#455A64', bar_count),
        title: {
            text: ''
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                return '<div> ' + this.point.name + '<br>' + this.y + ' : ' + this.series.name +
                    '</div>';
            }
        },

        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
            }
        },
        yAxis: {
            type: 'logarithmic',
            title: {
                text: ytext,
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: ytext,
            data: data,
            dataLabels: {
                rotation: -90,
                align: 'right',
                format: '{point.y}',
                y: 1,
            },
        }],
        drilldown: {
            series: drilldown,
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat('%Y %m %d', this.value);
                    }
                }
            }
        }
    });
}

/**
 * pie semi circle chart
 */
function get_pie_semi_circle_chart(id, data, color_list) {
    Highcharts.chart(id, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            borderRadius: 20
        },
        title: {
            text: '',
        },
        tooltip: {
            // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            },
            series: {
                states: {
                    hover: {
                        brightness: -0.1
                    }
                },
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: data,
            colors: color_list
        }]
    });
}

/**
 * donut chart
 */
function get_donut_chart(id, data, ytext, bar_count, base_color) {
    Highcharts.chart(id, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            borderRadius: 20
        },
        colors: chartColors(base_color || '#e5922e', bar_count, .75),
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            alignColumns: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            },
            series: {
                states: {
                    hover: {
                        brightness: -0.2
                    }
                },
            }
        },
        series: [{
            name: ytext,
            colorByPoint: true,
            innerSize: '60%',
            data: data
        }]
    });
}

/**
 * map chart
 */
function get_map_chart(data, text) {
    Highcharts.mapChart('iran_chart', {
        chart: {
            map: Highcharts.maps["countries/ir/ir-all"],
            style: {
                fontFamily: 'yekan',
            },
            borderRadius: 20
        },
        title: {
            text: text + '',
            style: {
                fontSize: 20,
                direction: 'rtl',
                fontWeight: 'bold'
            }
        },
        colorAxis: {
            maxColor: '#bb0025',
            type: 'logarithmic',
            endOnTick: false,
            startOnTick: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            data: data,
            joinBy: ['hc-a2', 'code3'],
            name: '',
            allowPointSelect: false,
            borderColor: 'black',
            borderWidth: 0.5,
            states: {
                hover: {
                    brightness: -0.2,
                    borderColor: '#bb0025',
                    borderWidth: 1,
                }
            },

            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<table style="width:0.5em>',
                pointFormat: '<tr><th><b style="color: #38383d;width:1000px">{point.value}</b></th></tr><tr><td style="color: #272729">:{point.name} </td></tr>',
                footerFormat: '</table>',
                valueDecimals: 0
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    fontFamily: 'yekan',
                    textOutline: 0
                }
            }
        }]
    });

}
