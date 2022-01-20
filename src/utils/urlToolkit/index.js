import { urlProjects } from './modules';

/**
 * @description 获取url全局工具类 在使用之前需要配置指定项目 eg：new UrlToolkit('coms');
 * @author arwenfang
 * @class UrlToolkit
 */
// eslint-disable-next-line padded-blocks
class UrlToolkit {
  /**
   * Creates an instance of UrlToolkit.
   * @author arwenfang
   * @param {Object} [{
   *     projectName,
   *     environment
   *   }={}]
   */
  constructor({ projectName, environment } = {}) {
    this.projectName = projectName || '';
    this.environment = environment || '';
    this.urlProjects = urlProjects[`${projectName}Urls`] || {};
  }

  /**
   * @description 获取指定url eg:new UrlToolkit('coms').getUrls({urlKey:'cc_hostname'})
   * @author arwenfang
   * @param {Object} [{
   *     urlKey = '',      指定url
   *     isFixed = false   是否获取固定协议
   *   }={}]
   * @returns {Object}
   */
  getUrls({ urlKey = '', isFixed = false } = {}) {
    if (this.validatorKey(urlKey)) return {};

    return this.environment
      ? this.setUrls({
        urlKey,
        isFixed,
      })[this.environment]
      : this.setUrls({
        urlKey,
        isFixed,
      });
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
        urlProject[key] = urlProject[key].replace(/^(http|https):/, window.location.protocol);
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

export default UrlToolkit;
