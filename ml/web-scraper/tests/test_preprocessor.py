import pytest

from preprocessor import Preprocessor

class PreprocTester:
    def __init__(self, preproc):
        self.preproc = preproc

    def check(self, before, after):
        assert self.preproc.do_prep(before) == after

    def check_dont_change(self, arg):
        self.check(arg, arg)

    def check_same(self, args_list):
        after = [preproc.do_prep(x) for x in args_list]
        assert max([x == after[0] for x in after])


def test_preproc_url_basics():
    tester = PreprocTester(Preprocessor('url'))

    tester.check('https://google.com', 'google.com')
    tester.check('http://google.com', 'google.com')
    tester.check('google.com/', 'google.com')

    tester.check_dont_change('google.com/one/two/three')


def test_preproc_url_strange_symbols():
    tester = PreprocTester(Preprocessor('url'))

    tester.check_dont_change('web.telegram.org/#/im?p=@polgrisha')
    tester.check_dont_change('госуслуги.рф')


def test_preproc_phone_basics():
    tester = PreprocTester(Preprocessor('phone'))

    tester.check('8-913-912-34-56', '89139123456')
    tester.check('8 (913) 912 34 56', '89139123456')
    tester.check('+7 (913) 912 34 56', '89139123456')
    tester.check('+7 (913) 912 34-56', '89139123456')
    tester.check(89139123456, '89139123456')


def test_preproc_phone_6numbers():
    tester = PreprocTester(Preprocessor('phone'))
    # shoudn't replace firts 7 to 8
    tester.check_dont_change('737475')


def test_unknown_type():
    preproc = Preprocessor('foo')
    with pytest.raises(RuntimeError, match='Unknown preprocessor name'):
        preproc.do_prep('anything')
