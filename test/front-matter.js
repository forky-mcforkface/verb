// node_modules
var expect = require('chai').expect;
var file = require('fs-utils');

// Local libs
var phaser = require('../');


describe('front-matter', function () {

  describe('when "---json" is defined after the first front-matter delimiter', function () {
    it('should detect JSON as the language and correctly parse it as JSON.', function (done) {
      var fixture = file.readFileSync('./test/fixtures/autodetect-json.md');
      var actual = phaser.process(fixture);
      expect(actual.content).to.deep.equal('JSON Front Matter');
      done();
    });
  });

  describe('when "---json" is defined after the first custom front-matter delimiter', function () {
    it('should detect JSON as the language and correctly parse it as JSON.', function (done) {
      var fixture = file.readFileSync('./test/fixtures/autodetect-json-delims.md');
      var actual = phaser.process(fixture, {
        matter: {
          delims: [';;;', ';;;']
        }
      });
      expect(actual.content).to.deep.equal('JSON Front Matter');
      done();
    });
  });

  describe('when "---coffee" is defined after the first front-matter delimiter"', function () {
    it('should detect CoffeScript as the language, evaluate it, and extend the context with the result.', function (done) {
      var fixture = file.readFileSync('./test/fixtures/autodetect.md');
      var actual = phaser.process(fixture, {
        config: {},
        repository: {
          "type": "git",
          "url": "https://github.com/assemble/phaser.git"
        },
      });
      expect(actual.content).to.deep.equal('jonschlinkert');
      done();
    });

    it('should evaluate it and extend the context with the returned result.', function () {
      var fixture = 'test/fixtures/matter-coffee.md';
      var actual = phaser.read(fixture);
      var expected = 'Coffee Front Matter';
      expect(actual).to.eql(expected);
    });
  });

  describe('when "---yaml" is defined after the first front-matter delimiter"', function () {
    it('should detect YAML as the language.', function (done) {
      var fixture = file.readFileSync('./test/fixtures/autodetect-yaml.md');
      var actual = phaser.process(fixture, {
        config: {},
        repository: {
          "type": "git",
          "url": "https://github.com/assemble/phaser.git"
        },
      });
      actual = JSON.parse(JSON.stringify(actual));
      expect(actual.content).to.deep.equal('jonschlinkert');
      done();
    });
  });

  describe('when no language is defined after the first fence', function () {
    it('should fall back YAML as the language.', function (done) {
      var fixture = file.readFileSync('./test/fixtures/autodetect-no-lang.md');
      var actual = phaser.process(fixture, {
        config: {},
        repository: {
          "type": "git",
          "url": "https://github.com/assemble/phaser.git"
        },
      });
      actual = JSON.parse(JSON.stringify(actual));
      expect(actual.content).to.deep.equal('jonschlinkert');
      done();
    });
  });


  /**
   * Coffee Front Matter
   */

  describe('when CoffeeScript is used in front-matter', function () {

    it('should be evaluated as CoffeeScript and extend the context with the result.', function (done) {
      var fixture = file.readFileSync('test/fixtures/coffee.md');
      var actual = phaser.process(fixture, {
        lang: 'coffee'
      });
      expect(actual.content).to.deep.equal('Coffee Front Matter');
      done();
    });

    it('should evaluate functions and extend the context with the returned result.', function (done) {
      var fixture = file.readFileSync('test/fixtures/coffee-fn.md');
      var actual = phaser.process(fixture);
      expect(actual.content).to.equal('jonschlinkert\ntreknilhcsnoj\n');
      done();
    });
  });
});


