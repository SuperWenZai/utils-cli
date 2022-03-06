import { urlProjects } from './modules';
import Tool from './tool';

/**
 * @description 获取url初始类 在使用之前需要配置指定项目 eg：UrlToolkit.create({ projectName: 'coms' });
 * @class UrlToolkit
 */
// eslint-disable-next-line padded-blocks
class UrlToolkit {
  /**
   * Creates an instance of UrlToolkit.
   */
  constructor() {
    this.projectName = '';
    this.environment = '';
    this.urlProjects = {};
  }

  /**
   * @description Vue 实例挂载
   * @param {Object} Vue
   * @param {Object} options
   */
  install(Vue, options) {
    Vue.prototype.$urlToolkit = this.create(options);
    globalThis && (globalThis.$urlToolkit = urlToolkit);
  }

  /**
   * @description 创建url项目
   * @param {Object} [{ projectName, environment }={}]
   * @returns {Object}
   */
  create({ projectName, environment } = {}) {
    this.projectName = projectName || '';
    this.environment = environment || '';
    this.urlProjects = urlProjects[`${projectName}Urls`] || {};

    return new Tool({
      projectName: this.projectName,
      environment: this.environment,
      urlProjects: this.urlProjects,
    });
  }
}

const urlToolkit = new UrlToolkit();

export default urlToolkit;
