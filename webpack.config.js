const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //для автоматического добавления в HTMl js скриптов
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // для автоматического удаления старых бандлов из выходной папки
const CopyWebpackPlugin = require('copy-webpack-plugin'); // для копирование файлов 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // нужет чтобы для стилей создавать отдельный файл css после сборки
const TerserWebpackPlugin = require('terser-webpack-plugin'); //для минификации js файлов
const OptimizeCssAssertsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // для минификации css файлов


// Определяем режим разработки или режим прода в каждой ОС переменная NODE_ENV задается по разному
//поэтому для корректного задания ее значения ставим пакет cross-env 
//и теперь в package.json в поле со скриптами переписываем скрипты с использованием этой переменной
// БЫЛО
// "scripts": {
//  "dev": "webpack --mode development",
//  "build": "webpack --mode production",
//  "watch": "webpack --watch --mode development",
//  "start": "webpack-dev-server --mode development --open"

// },
//СТАЛО:
// "scripts": {
//  "dev": "cross-env NODE_ENV=development webpack --mode development",
//  "build": "cross-env NODE_ENV=production webpack --mode production",
//  "watch": "cross-env NODE_ENV=development webpack --watch --mode development",
//  "start": "cross-env NODE_ENV=development webpack-dev-server --mode development --open"

// },

// вообще для чего определять этот параметр
//  в режиме прод нам надо максимально минифицировать все файлы, которые будут грузиться в браузере
// начнем с html и обратимся в плагину html-webpack-plugin и его параметру minify - это объект и ключу collapseWhiteSpace зададим значение true
// collapseWhitespace: true // теперь html минифицируется
// теперь с css - для этого надо поставить плагин optimize-css-assets-webpack-plugin

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    // перезаписываем базовые составляющие для минификации в webpack
    config.minimizer = [
      new OptimizeCssAssertsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

// Хорошей практикой в webpack являтся то что в режиме прод нужно оставить хеши в названиях файлов сборки,
// а в режиме разработки они не нужны, чтобы было проще разбираться что за файлы
// для этого напишем метод
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

//================================
// в конфигурации много повторений и правильным решением будет все это дело устранить
const copyImage = image => {
  return {
    from: path.resolve(__dirname, `client/src/img/${image}`),
    to: path.resolve(__dirname, 'client', 'dist')
  }
}



module.exports = {
  // тот путь откуда мы будем брать файлы и данные для сборки
  // context: path.resolve(__dirname, 'client', 'src'),
  context: path.resolve(__dirname, 'client', 'src'), //строка, которая говорит о том, где лежат исходники приложения, после указание пути в этом ключе в enty можно не указывать полный путь
  mode: 'development',
  entry: {
    // main: './client/src/js/index.js',
    main: './js/index.js',
    // app: './js/app.js'
  },
  output: {
    // filename: filename('js'),
    // filename: '[name].bundle.js'
    // filename: '[name].[contenthash].js',
    filename: filename('js'),
    path: path.resolve(__dirname, 'client', 'dist')
  },
  watchOptions: { // задает параметры для webpack --watch
    ignored: /node_modules/
  },
  resolve: {
    extensions: ['.js', '.json', '.png'], // указываем webpack какие расширения нужно понимать по умолчанию
    // alias позволяет задать некие шаблоны допустим чтобы избавиться от указания длинных путей при загрузке файло или картинок
    //такого типа ../../../img
    // тут мы просто уцказываем название alias и пишеи на какой путь оно будет указывать
    // alias: {
    //     '@img': path.resolve(__dirname, 'client', 'src', 'img')
    // }
  },
  // optimization - допустим у нас ситуация, когда есть несколько  (например - 3 - index.js app.js modal.js)
  // модулей и нужно использоваться modal.js и в index.js и в app.js когда мы их просто импортируем в обоих файлах
  // получается, что мы дублируем функционал modal.js 2 раза - в index.js один раз и  в app.js , что существенно
  // увеличивает скорость загрузки страницы, для этого есть в webpack поле optimization и у него есть параметр -
  //splitChunks по идее это работает так - webpack выносит общий модуль как отдельный файл и он используется и там и там
  // но почему-то на большом количестве общий файлов все поломалось в другой проекте, пришлось убрать optimzation
  // и пока тут тоже закоментирую
  optimization: optimization(),

  // тут используется пакет webpack-dev-server - позволяется автоматически отображать все изменения на странице и сразу пересобирается сборку
  // при изменениях
  devServer: {
    port: 4200,
    // параметр hot позволяется обновлять данные на странице не перезагружая ее.
    // в isDev будем записывать булевую переменную в зависимости от типа среды - прод или дев
    hot: isDev,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      copyImage('menu.png'),
      copyImage('groupLogo.png'),
      copyImage('favicon.ico'),
      copyImage('no-photo.png'),
      copyImage('u-logo.png'),
      copyImage('no-data.png'),
      copyImage('edit-card.png'),
      copyImage('search.png')
    ]),
    new MiniCssExtractPlugin({
      // filename: '[name].css'
      filename: filename('css')
    })

  ],

  //loader - это возможность добавления к webpack функционала для работы с другими типами файлов
  // для указание loader ов нужно создать правила вот таким образом,
  //в этих правилах указываются объекты в которых описывается определенный тип loader-а
  // test - это регулярное выражение в этом выражении мы указываем шаблон и если файл соответвует данному шаблону то
  // в ключе use: в правиле мы указываем webpack с каким loader - ом взаимодейтсвоватбь
  // css -loader позволяется работать с import css в js файлах, а style-loader - добавить подключенный .css стиль в заголовок
  // header в html файле - это конечно хорошо - но хотелось бы в отдельном файле. Для этого нужно использовать плагин -
  // mini-css-extract-plugin, также этот плагин предоставляет класс для добавления loader - в правилах loader style-loader можно
  // заменить на инстанск класса загруженного из mini-css-extract-plugin с вызовом метода loader MiniCssExtractPlugin.loader -
  // это позволит выносит css в отдельный файл, но также нужно добавить еще и плагин, указав параметры (см выше)


  // =============================================
  // для работы с другими типами файлов воспользуемся другими типами loader
  //например file-loader  для работы с различными файлами например картинками
  //используя loader типа file-loader мы в итоговую сборку добавим файлы, отличные от js, с которыми можно работать из js
  //также file loader подгрузит и картинка например если они указаны в css, но
  //как быть с теми картинками, котоыре указаны в html? ( ИСПОЛЬЗОВАТЬ ПЛАГИН CleanWebpackPlugin СМ ВЫШЕ) а пока про шрифты,
  //ведь file loader и с ними работает
  //укажем нове правило. Если нужно работать через js с другими типами файлов напрмиер csv,
  //xml то просто создаем новое правило для
  //их loader и загружаем loader, напрмиер для xml - xml-loader
  //======================================================================

  // так как мы работает с предпроцессорами то было бы неплохо их компилировать и собирать тоже
  // webpack ом для этого для этого также создаем новое правило для нового loader
  //  для этого воспользуемся другим способом подключения loader с использованием параметра options
  // вот так это будет выглядеть
  //    {
  //     test: /\.less$/,
  //     use: [{
  //             loader: MiniCssExtractPlugin.loader,
  //             options: {
  //                 hmr: isDev, //тоже самое что и hot для devServer - изменяется данные на странице без ее перезагрузки hot module reload
  //                 reloadAll: true
  //             },
  //         },
  //         'css-loader',
  //         'less-loader'
  //     ]
  // }

  // это путь для less сейчас сделаем для sass и проверим работу плагина установим пакеты для sass
  //  npm i -D node-sass sass-loader

  module: {
    rules: [{
      test: /\.css$/,
      // use: ['style-loader', 'css-loader'],
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev, //тоже самое что и hot для devServer - изменяется данные на странице без ее перезагрузки hot module reload
            reloadAll: true
          },
        },
          'css-loader',
          'sass-loader'
        ]

      }
    ]
  }

}