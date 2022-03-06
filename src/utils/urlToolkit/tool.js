/**
 * @description 获取url工具类 在使用之前需要配置指定项目
 * @author arwenfang
 * @class Tool
 */
class Tool {
  /**
   * Creates an instance of Tool.
   * @author arwenfang
   * @param {*} [{ projectName, environment, urlProjects }={}]
   */
  constructor({ projectName, environment, urlProjects } = {}) {
    this.projectName = projectName;
    this.environment = environment;
    this.urlProjects = urlProjects;
  }

  /**
   * @description 获取指定url eg:new UrlToolkit('coms').getUrls({urlKey:'cc_hostname'})
   * @author arwenfang
   * @param {Object} [{
   *     urlKey = '',      指定url
   *     isFixed = false   是否获取固定协议
   *     environment = ''  获取指定环境qc\beta\release链接
   *   }={}]
   * @returns {Object}
   */
  getUrls({ urlKey = '', isFixed = false, environment = '' } = {}) {
    if (this.validatorKey(urlKey)) return {};

    const env = environment || this.environment;
    const setUrls = this.setUrls({
      urlKey,
      isFixed,
    });

    return env ? setUrls[env] : setUrls;
  }

  /**
   * @description 自适应当前http/https协议设置
   * @author arwenfang
   * @param {Object} [{
   *     urlKey = '',      指定url
   *     isFixed = false   是否获取固定协议
   *   }={}]
   * @returns {Object}
   */
  setUrls({ urlKey = '', isFixed = false } = {}) {
    if (this.validatorKey(urlKey)) return {};

    const urlProject = this.urlProjects[urlKey];
    if (!window.location || isFixed) return urlProject;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in urlProject) {
      if (Object.prototype.hasOwnProperty.call(urlProject, key)) {
        urlProject[key] = urlProject[key].replace(/^https?:/, window.location.protocol);
      }
    }

    return urlProject;
  }

  /**
   * @description 检验是否传urlKey
   * @author arwenfang
   * @param {String} urlKey
   * @returns {Boolean}
   */
  validatorKey(urlKey) {
    let tips = '';
    let pass = false;

    if (!this.urlProjects[urlKey]) {
      tips = '请检查是否配置对应的urlKey or 是否在实例urlToolkit时候配置项目名称!';
      pass = true;
    }

    if (!urlKey) {
      tips = '请传入指定urlKey!';
      pass = true;
    }

    if (tips) {
      console.error(tips);
    }
    return pass;
  }
}

export default Tool;
