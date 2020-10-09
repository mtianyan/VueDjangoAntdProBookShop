import shutil


def init_xadmin_api():
    shutil.copytree('/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin_api_cli/xadmin_api_init',
                    '/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin_api')


def init_xadmin():
    shutil.copytree('/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin_api_cli/antd_full_templates',
                    '/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin')


if __name__ == '__main__':
    # init_xadmin_api()
    init_xadmin()